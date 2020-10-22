import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Store } from'@ngxs/store';
import { AddArtist } from './../../state/artist.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private api: ApiService){}

  ngOnInit() {
    this.store.dispatch(new AddArtist({name: 'kjsdhfg', genres: ['sdjkfhg']}));
    let a = this.api.getService('sdkjhfg');
    a.subscribe(e => {
      console.log(e);
    });
  }
}
