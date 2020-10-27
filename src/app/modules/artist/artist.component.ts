import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from'@ngxs/store';
import { AddAlbumList } from './../../state/artist.actions';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistComponent implements OnInit, OnDestroy {

  albums$;
  albumList;
  artistId;
  private subscribe: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private cd: ChangeDetectorRef,
  ) { 
    this.route.paramMap.subscribe((snap: any) => {
      this.artistId = snap.params.id.toString();
      this.store.dispatch(new AddAlbumList({id: this.artistId}));
    })
  }

  ngOnInit() {
    this.albums$ =  this.store.select(state => state.spotify);
    this.subscribe = this.albums$.subscribe(i =>   {      
      if(i.activeArtist) {
        this.albumList = i.albums[i.activeArtist];
        this.cd.markForCheck();
      }      
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
}
