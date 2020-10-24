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
                    let artistData = new Map();
                    data.map(e => {
                        artistData.set(e.id, new ArtistData(e))
                    })
                    if(data.length > 0) {
                        return patchState({
                            active: keyValue,
                            activeAlbumList: null,
                            activeAlbum: null,
                            artists: {
                                ...temp,
                                [keyValue]: artistData
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
        let checkAlbums = state.artists[state.active].get(payload.id).albums;
      
        if(!checkAlbums) {
            return this.api.getSingleArtist(payload.id).pipe(
                tap(data => {
                    const actAlbums = state.artists[state.active].get(payload.id).albums = data.items.map(d => new Albums(d));
                    patchState({
                        activeArtist: payload.id,
                    })
                })
            )
        } else {
            patchState({
                activeArtist: payload.id,
            })
        }
    }

    @Action(AddAlbumTracks)
    AddTracks({getState, patchState}: StateContext<ArtistStateModel>, {payload}: AddAlbumTracks) {
        const state = getState();
        return this.api.getArtistTracks(payload.id).pipe(
            tap(data => {
                console.log(data);
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
