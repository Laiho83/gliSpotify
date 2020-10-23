import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArtistComponent } from './artist.component'
import { ArtistRoutingModule } from './artist-routing.module';
import { AlbumComponent } from './album/album.component';

import { ApiService } from './../../services/api.service';

@NgModule({
  declarations: [
    ArtistComponent,
    AlbumComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
  ],
  providers: [
    ApiService
  ],
})
export class ArtistModule {}
