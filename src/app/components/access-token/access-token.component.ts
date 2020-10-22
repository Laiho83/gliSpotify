import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Store } from'@ngxs/store';
import { GetAuth } from '../../state/auth.action';
import { Router } from '@angular/router';

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
    this.api.setToken();
    this.router.navigate(['home']);
  }
}
