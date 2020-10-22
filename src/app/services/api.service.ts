import { APP_CONFIG } from './../config/app.config';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, EMPTY, forkJoin } from 'rxjs';
import { map, catchError, take, mergeMap } from 'rxjs/operators';

import { Store } from'@ngxs/store';
import { GetAuth } from './../state/auth.action';
import { Router } from '@angular/router';
import { AddArtist } from './../state/artist.actions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private headers;
  private apiRoot = 'https://api.spotify.com';
  private config = APP_CONFIG;
  private clientId = APP_CONFIG.spotify.clientId;
  private clientSecret = encodeURIComponent(APP_CONFIG.spotify.clientSecret);
  private redirectUri = 'http://localhost:4200/access_token/';
  private authorizeUrl: string = '';
  private tokenBearer: string = '';

  constructor(
    private http: HttpClient,
    private store: Store,
    public router: Router
  ) { 
      this.authorizeUrl = 
        `https://accounts.spotify.com/es-ES/authorize?client_id=${
          this.clientId}&response_type=token&redirect_uri=${
            this.redirectUri}&expires_in=3600`
      this.setToken();
  }

  getArtists(slug) {
    return this.http.get(`${this.apiRoot}/v1/search?q=${slug}&type=artist&limit=50&offset=0`,  { headers: this.headers }).pipe(
      map((e: any) => {
        return e.artists.items;
      }),
      catchError(err => {
        console.log('Error API getArtists ', err.message);
        return of([]);
      })
    );
  }

  getSingleArtist(id) {
    return this.http.get(`${this.apiRoot}/v1/artists/${id}/albums`,  { headers: this.headers }).pipe(
      map((e: any) => {
        return e;
      }),
      catchError(err => {
        console.log('Error API getArtist ', err.message);
        return of([]);
      })
    );
  }

  checkToken() {
    let isToken$ = this.store.select(state => state.auth.token);
    isToken$.subscribe(e => {
      if(!e) {
        window.location.href = this.authorizeUrl;
      } else {
        this.checkToken();
      }
    });
  }

  setToken() {
    this.store.select(state => state.auth.token).subscribe(e => {
      this.tokenBearer = e;
      this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.tokenBearer})
    });
  }
}