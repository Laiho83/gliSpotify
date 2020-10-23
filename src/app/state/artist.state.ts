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
        if(!(!!state.artists && !!state.artists[keyValue])) {
            return this.api.getArtists(payload.name).pipe(
                tap(data => {
                    if(data.length > 0) {
                        return patchState({
                            active: keyValue,
                            activeAlbumList: null,
                            activeAlbum: null,
                            artists: {
                                ...temp,
                                [keyValue]: data.map(e => new ArtistData(e))
                            }
                        })
                    } else {
                        return patchState({
                            active: '',
                        })
                    }
                })
            )
        } else {
            patchState({
                active: keyValue,
            })
        }
    }
    
    @Action(AddAlbumList)
    AddAlbums({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddAlbumList) {
        const state = getState();
        let checkAlbums = state.artists[state.active].filter(e => e.id === payload.id).map(a=>a.albums ? a.albums : null)[0];
      
        if(!checkAlbums) {
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
                        activeAlbumList: actAlbums.map(a=>a)[0],
                        activeArtist: payload.id,
                        activeAlbum: null,
                        artists: {
                            ...temp,
                        }
                    })
                })
            )
        } else {
            patchState({
                activeArtist: payload.id,
                activeAlbumList: checkAlbums
            })
        }
    }

    @Action(AddAlbumTracks)
    AddTracks({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddAlbumTracks) {
        const state = getState();
        return this.api.getArtistTracks(payload.id).pipe(
            tap(data => {
               
                    
                state.activeTracks = data.items.map(e => new Tracks(e));

                const temp = state.artists;
                patchState({
                    active: state.active,
                    activeAlbumList: state.activeAlbumList,
                    activeAlbum: payload.id,
                    artists: {
                        ...temp,
                    }
                })
            })
        )
    }
}
