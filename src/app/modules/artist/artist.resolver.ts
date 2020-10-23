import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './../../services/api.service';

@Injectable()
export class ArtistResolver implements Resolve<any> {
  constructor(private api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    // console.log(route.paramMap.get('id'));
    // this.api.getSingleArtist(route.paramMap.get('id')).subscribe(e=>console.log(e))
  }
}
