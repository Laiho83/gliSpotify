import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArtistStateModel, ArtistData, Albums, Tracks } from './../models/artist.model'
import { AddArtist, AddAlbumList, AddAlbumTracks } from './artist.actions'
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
                activealbums: null,
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
                const actAlbums = state.artists[state.active]
                  .filter(e => e.id === payload.id)
                  .map(a => a.albums = data.items
                    .map(d => new Albums(d))
                  );
                const temp = state.artists;
                patchState({
                    active: state.active,
                    activealbums: actAlbums.map(a=>a)[0],
                    activeArtist: payload.id,
                    artists: {
                        ...temp,
                    }
                })
            })
        )
    }

    @Action(AddAlbumTracks)
    AddTracks({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddAlbumTracks) {
        const state = getState();
        return this.api.getArtistTracks(payload.id).pipe(
            tap(data => {
                state.artists[state.active]
                  .filter(e => e.id === payload.id)
                  .map(a => a.tracks = data.items
                    .map(d => new Tracks(d))
                  );
                
                  state.activealbums.tracks = data.items;
                  
                const temp = state.artists;
                patchState({
                    active: state.active,
                    activealbums: state.activealbums,
                    artists: {
                        ...temp,
                    }
                })
            })
        )
    }

}