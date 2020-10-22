import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArtistStateModel } from './../models/artist.model'
import { AddArtist, RemoveArtist } from './artist.actions'
import { ApiService } from './../services/api.service';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';


@State<ArtistStateModel>({
    name: 'artists',

})

@Injectable()
export class ArtistState {
    @Selector()
    static getartists(state: ArtistStateModel) {
        return state.artists
    }

    constructor(private api: ApiService){}

    @Action(AddArtist)
    add({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddArtist) {
        const state = getState();
        
        return this.api.getService(payload.name).pipe(
            tap(data => patchState({
              artists: new ArtistStateModel(data)
            }))
        )
    }

    // @Action(RemoveTutorial)Add
    // remove({getState, patchState}: StateContext<artistStateModel>, {payload}: RemoveTutorial ) {
    //     patchState({
    //         tutorials: getState().tutorials.filter(a=> a.name != payload)
    //     })
    // }
}