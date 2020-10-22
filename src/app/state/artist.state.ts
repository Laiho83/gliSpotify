import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArtistStateModel, ArtistData, Albums } from './../models/artist.model'
import { AddArtist, AddAlbumList } from './artist.actions'
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
        const temp = state.artists;
        let keyValue = payload.name.toString().replace(/[^A-Z0-9]/ig, "").toLowerCase();
        return this.api.getArtists(payload.name).pipe(
            tap(data => patchState({
                active: keyValue,
                artists: {
                    ...temp,
                    [keyValue]: data.map(e => new ArtistData(e))
                }
            }))
        )
    }
    
    @Action(AddAlbumList)
    AddAlbums({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddAlbumList) {
        const state = getState();        
        return this.api.getSingleArtist(payload.id).pipe(
            tap(data => {
                state.artists[state.active]
                  .filter(e => e.id === payload.id)
                  .map(a=>a.albums=data.items
                  .map(d=>new Albums(d)));
                const temp = state.artists;
                patchState({
                    active: state.active,
                    artists: {
                        ...temp,
                    }
                })
            })
        )
    }

    // @Action(RemoveTutorial)Add
    // remove({getState, patchState}: StateContext<artistStateModel>, {payload}: RemoveTutorial ) {
    //     patchState({
    //         tutorials: getState().tutorials.filter(a=> a.name != payload)
    //     })
    // }
}