import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from'@ngxs/store';
import { AddAlbumList } from './../../state/artist.actions';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistComponent implements OnInit {

  albums$;
  albumList;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private cd: ChangeDetectorRef,
  ) { 
    this.route.paramMap.subscribe((snap: any) => {
      this.store.dispatch(new AddAlbumList({id: snap.params.id.toString()}));
    })
  }

  ngOnInit() {
    this.albums$ =  this.store.select(state => state.spotify);
    this.albums$.subscribe(i => {
      const temp = i.active || null;
      if(i.activealbums) {
        this.albumList = i.activealbums;
        this.cd.markForCheck();
      }      
    });
  }
}
