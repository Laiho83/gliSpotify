import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Store } from'@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artists$;
  artistList;

  constructor(private store: Store, private api: ApiService){}

  ngOnInit() {
    this.artists$ =  this.store.select(state => state.spotify);
    this.artists$.subscribe(i => {
      const temp = i.active || null;
      if (temp){
        this.artistList = i.artists[temp];
      } else {
        this.artistList = [];
      }
    });
  }
}
