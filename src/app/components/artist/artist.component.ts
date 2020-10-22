import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from'@ngxs/store';
import { AddAlbumList } from './../../state/artist.actions';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) { 
    this.route.paramMap.subscribe((snap: any) => {
      this.store.dispatch(new AddAlbumList({id: snap.params.id.toString()}));
    })
  }

  ngOnInit() {
    
    // this.artist$ =  this.store.select(state => state.spotify);
    // this.artist$.subscribe(a=>console.log(a));
  }
}
