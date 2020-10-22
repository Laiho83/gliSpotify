import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Store } from'@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAlbumTracks } from './../../../state/artist.actions';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  
  albumId;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private store: Store,
    ) { 
      this.route.paramMap.subscribe((snap: any) => {
        console.log(snap.params.album);
        this.albumId = snap.params.album.split(':');
        this.store.dispatch(new AddAlbumTracks({
          id: this.albumId[1],
          artistId: this.albumId[0]
        }));
      })
    }

  ngOnInit(): void {

  }

}
