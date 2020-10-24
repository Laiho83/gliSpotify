import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service';
import { Store } from'@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private store: Store, private api: ApiService){}

  canActivate() {
    this.api.checkTokenLogin();
    return this.api.checkToken();
  }
}
