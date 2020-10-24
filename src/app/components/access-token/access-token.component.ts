import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from'@ngxs/store';
import { ApiService } from '../../services/api.service';
import { GetAuth } from '../../state/auth.action';

@Component({
  selector: 'app-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.scss']
})
export class AccessTokenComponent implements OnInit {

  constructor(
    private store: Store,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetAuth({accessToken: window.location.hash.split('&')[0].replace('#access_token=', '')}));
    this.api.storeToken();
    this.router.navigate(['home']);
  }
}
