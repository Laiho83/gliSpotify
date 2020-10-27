import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from'@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAlbumTracks } from './../../../state/artist.actions';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumComponent implements OnInit, OnDestroy {

  
  albumId;
  album$;
  songLists;
  activeAlbum;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    ) { 
      this.route.paramMap.subscribe((snap: any) => {
        this.albumId = snap.params.album.split(':');
        this.store.dispatch(new AddAlbumTracks({
          id: this.albumId[1],
          artistId: this.albumId[0]
        }));
      })
    }

  ngOnInit() {
    this.album$ = this.store.select(state => state.spotify);
    this.subscription = this.album$.subscribe(i => {
      if(!!i.tracks && i.tracks[i.activeAlbum]) {
        this.songLists = i.tracks[i.activeAlbum].get('data');
        this.activeAlbum = i.tracks[i.activeAlbum].get('info');
        this.cd.markForCheck();
      }
    })
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  setDate(date) {
    const formatedDate: Date = new Date(date.replace(/-/g, '/'));
    return formatedDate;
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
