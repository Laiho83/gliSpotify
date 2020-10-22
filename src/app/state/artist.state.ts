import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArtistStateModel, ArtistData } from './../models/artist.model'
import { AddArtist } from './artist.actions'
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
        return state.items
    }

    constructor(private api: ApiService){}

    @Action(AddArtist)
    add({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddArtist) {
        const state = getState();
        
        return this.api.getService(payload.name).pipe(
            tap(data => patchState({
                items: data.map(e => new ArtistData(e))
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