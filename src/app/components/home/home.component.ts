import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Store } from'@ngxs/store';
import { AddArtist } from './../../state/artist.actions';
import { SearchComponent } from './../search/search.component';

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
    this.artists$ =  this.store.select(state => state.artists);
    this.artists$.subscribe(i => {
      console.log(i);
      // this.artistList = i.items;
    });
  }
}
