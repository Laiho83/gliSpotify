import { APP_CONFIG } from './../config/app.config';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Store } from'@ngxs/store';
import { Router } from '@angular/router';
import { GetAuth } from './../state/auth.action';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiRoot = 'https://api.spotify.com';
  private clientId = APP_CONFIG.spotify.clientId;
  private redirectUri = `${APP_CONFIG.apiurl}access_token/`;
  private authorizeUrl: string = '';

  constructor(
    private http: HttpClient,
    private store: Store,
    public router: Router
  ) {
      this.authorizeUrl = 
        `https://accounts.spotify.com/authorize?client_id=${
          this.clientId}&response_type=token&redirect_uri=${
            this.redirectUri}&expires_in=3600`
  }

  getArtists(slug) {
    return this.http.get(`${this.apiRoot}/v1/search?q=${slug}&type=artist&limit=50&offset=0`).pipe(
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
    return this.http.get(`${this.apiRoot}/v1/artists/${id}/albums`).pipe(
      map((e: any) => {
        return e;
      }),
      catchError(err => {
        console.log('Error API getArtist ', err.message);
        return of([]);
      })
    );
  }

  getArtistTracks(id) {
    return this.http.get(`${this.apiRoot}/v1/albums/${id}/tracks`).pipe(
      map((e: any) => {
        return e;
      }),
      catchError(err => {
        console.log('Error API getArtist ', err.message);
        return of([]);
      })
    );
  }

  checkTokenLogin() {
    this.store.dispatch(new GetAuth({accessToken: sessionStorage.getItem('token')}));
    if(!this.checkToken()) {
      window.location.href = this.authorizeUrl;
    }
  }

  checkToken() {
    let hasToken;
    let isToken$ = this.store.select(state => state.auth.token);
    isToken$.subscribe(e => {
      hasToken = !!e;
    });
    return hasToken;
  }

  storeToken() {
    this.store.select(state => state.auth.token).subscribe(e => {
      sessionStorage.setItem('token', e);
    });    
  }
}