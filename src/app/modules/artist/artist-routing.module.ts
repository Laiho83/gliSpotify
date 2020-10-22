import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistComponent } from './artist.component'
import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    component: ArtistComponent,
  },
  {
    path: 'album/:album',
    pathMatch: 'full',
    component: AlbumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule {}
