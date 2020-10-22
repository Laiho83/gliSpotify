import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArtistStateModel, ArtistData } from './../models/artist.model'
import { AddArtist } from './artist.actions'
import { ApiService } from './../services/api.service';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';


@State<ArtistStateModel>({
    name: 'spotify',

})

@Injectable()
export class ArtistState {
    @Selector()
    static getartists(state: ArtistStateModel) {
        return state.artists.name;
    }

    constructor(private api: ApiService){}

    @Action(AddArtist)
    add({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddArtist) {
        const state = getState();
        let keyValue = payload.name.toString();
        return this.api.getService(payload.name).pipe(
            tap(data => patchState({
                active: keyValue,
                artists: {
                    [keyValue]: data.map(e => new ArtistData(e))
                }
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