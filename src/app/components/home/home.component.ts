import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Store } from'@ngxs/store';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artists$;
  artistList;
  searchValue;
  searchOriginalValue;

  constructor(private store: Store, private api: ApiService){}

  ngOnInit() {
    this.artists$ =  this.store.select(state => state.spotify);
    this.artists$.subscribe(i => {
      this.searchValue = i.active || null;
      this.searchOriginalValue = i.searchValue;
      if (this.searchValue){
        this.artistList = i.artists[this.searchValue];
      } else {
        this.artistList = [];
      }
    });
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
}
