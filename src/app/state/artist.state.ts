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

        let keyValue = payload.name.toString().replace(/[^A-Z0-9]/ig, "").toLowerCase();
        if(!(!!state.artists && !!state.artists[keyValue])) {
            return this.api.getArtists(payload.name).pipe(
                tap(data => {
                    let artistData = new Map();
                    data.map(e => {
                        artistData.set(e.id, new ArtistData(e))
                    })
                    return patchState({
                        active: data.length > 0 ? keyValue : '',
                        searchValue: keyValue,
                        activeAlbum: null,
                        artists: {
                            ...state.artists,
                            [keyValue]: artistData
                        }
                    })
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
        if(!(!!state.albums && !!state.albums[payload.id])) {
            return this.api.getSingleArtist(payload.id).pipe(
                tap(data => {
                    let albulmsListData = new Map();
                    data.items.map(e => {
                        albulmsListData.set(e.id, new Albums(e))
                    })
                    patchState({
                        activeArtist: payload.id,
                        albums: {
                            [payload.id]: albulmsListData
                        }
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
        if(!(!!state.tracks && !!state.albums[payload.id])) {
            return this.api.getArtistTracks(payload.id).pipe(
                tap(data => {
                    let tracksData = new Map;
                    tracksData.set('data', data.items.map(e => new Tracks(e)));
                    tracksData.set('info', state.albums[state.activeArtist].get(payload.id))
                  
    
                    patchState({
                        activeAlbum: payload.id,
                        tracks: {   
                            ...state.tracks,
                            [payload.id]: tracksData
                        }
                    })
                })
            )
        } else {
            patchState({
                activeAlbum: payload.id,
            })
        }
    }
}
