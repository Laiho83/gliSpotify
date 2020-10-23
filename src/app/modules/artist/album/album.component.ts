import { Component, OnInit } from '@angular/core';
import { Store } from'@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAlbumTracks } from './../../../state/artist.actions';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {

  
  albumId;
  album$;
  songLists;
  activeAlbum;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private sanitizer: DomSanitizer
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
    this.album$.subscribe(i => {
      if(i.activeAlbumList && i.activeTracks) {
        this.songLists = i.activeTracks;
        this.activeAlbum = i.activeAlbumList.find(e => e.id === i.activeAlbum)
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
}
