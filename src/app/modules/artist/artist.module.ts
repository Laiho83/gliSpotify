import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArtistComponent } from './artist.component'
import { ArtistRoutingModule } from './artist-routing.module';

import { ApiService } from './../../services/api.service';

@NgModule({
  declarations: [
    ArtistComponent
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
