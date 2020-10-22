import { state } from '@angular/animations';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Auth, AuthStateModel } from './../models/auth.model';
import { GetAuth } from './auth.action';

@State<AuthStateModel>({
  name: 'auth',
})

export class AuthState {
  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Action(GetAuth)
  get(
    {getState, patchState}: StateContext<AuthStateModel>,
    {payload}: GetAuth
  ){
    const state = getState();
    patchState({
      token: payload.accessToken,
    })
  }


}