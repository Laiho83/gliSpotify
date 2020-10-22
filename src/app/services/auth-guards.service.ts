import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

import { Store } from'@ngxs/store';
import { GetAuth } from './../state/auth.action';
import { AccessTokenComponent } from '../components/access-token/access-token.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private store: Store, private api: ApiService){}

  canActivate() {
      let isToken$ = this.store.select(state => state.auth.token);
      let tokenActive;

      isToken$.subscribe(e => {
        if(!e) {
          this.api.checkToken();
          tokenActive = false;
        } else {
          tokenActive = true;
        }
      });
    return true;
  }
}
