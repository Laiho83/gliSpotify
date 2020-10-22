import { AuthGuardService } from './services/auth-guards.service';
import { HomeComponent } from './components/home/home.component';
import { AccessTokenComponent } from './components/access-token/access-token.component';
import { ArtistComponent } from './components/artist/artist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistResolver } from './components/artist/artist.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'access_token',
    component: AccessTokenComponent,
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
    resolve: { artist: ArtistResolver },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
