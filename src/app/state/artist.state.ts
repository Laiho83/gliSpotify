import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Artist, ArtistStateModel } from './../models/artist.model'
import { AddArtist, RemoveArtist } from './artist.actions'


@State<ArtistStateModel>({
    name: 'artists',
    defaults: {
        artists: []
    }
})

export class ArtistState {
    @Selector()
    static getartists(state: ArtistStateModel) {
        return state.artists
    }

    @Action(AddArtist)
    add({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddArtist) {
        const state = getState();
        patchState({
            artists: [...state.artists, payload]
        })
    }

    // @Action(RemoveTutorial)Add
    // remove({getState, patchState}: StateContext<artistStateModel>, {payload}: RemoveTutorial ) {
    //     patchState({
    //         tutorials: getState().tutorials.filter(a=> a.name != payload)
    //     })
    // }
}