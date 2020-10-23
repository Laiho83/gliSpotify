export interface ArtistName {
    name: string;
}

export interface AlbumId {
    id: string;
}

export interface TrackId {
    id: string;
    artistId: string;
}

export class ArtistStateModel {
    active: string;
    activeAlbumList: any;
    activeArtist: string;
    activeAlbum: string;
    activeTracks: Tracks;
    artists: {
        [name: string]: ArtistData[];
    }
}

export class ArtistData {
    id: string;
    name: string;
    genres: string[];
    image: string;
    obj: any;
    albums: Albums;
    constructor(obj: any) {
        this.id = obj.id;
        this.name = obj.name ? obj.name : '';
        this.genres = obj.genres;
        this.image = obj.images[1] && obj.images[1].url ? obj.images[1].url : '/assets/default.png';
      }
}

export class Albums {
    id: string;
    image: string;
    title: string;
    name: string;
    release: string;
    artist: string;
    constructor(obj: any) {
        this.id = obj.id;
        this.image = obj.images ? obj.images[1].url : '/assets/default.png';
        this.name = obj.name;
        this.release = obj.release_date;
        this.artist = obj.artists && obj.artists[0] ? obj.artists[0].name : null;
    }
}

export class Tracks {
    id: string;
    name: string;
    constructor(obj: any) {
        this.id = obj.id ? 'https://open.spotify.com/embed/track/'+obj.id : null;
        this.name = obj.name ? obj.name : null;
    }
}
