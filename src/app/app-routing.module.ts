import { AuthGuardService } from './services/auth-guards.service';
import { HomeComponent } from './components/home/home.component';
import { AccessTokenComponent } from './components/access-token/access-token.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
