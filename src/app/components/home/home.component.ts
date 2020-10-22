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

  constructor(private store: Store, private api: ApiService){}

  ngOnInit() {
    this.store.select(state => state.artists).subscribe(i=>{
      console.log(i);
    });
    // let a = this.api.getService('Metallica');
    // this.store.select(state => state.artists).subscribe(
    //   a => console.log(a)
    // );
  }
}
