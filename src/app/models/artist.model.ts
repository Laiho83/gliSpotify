export interface ArtistName {
    name: string;
}

export interface AlbumId {
    id: string;
}

export class ArtistStateModel {
    active: string;
    activealbums: any;
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
    constructor(obj: any) {
        this.id = obj.id;
        this.image = obj.images ? obj.images[1].url : '/assets/default.png';
        this.title = obj.title ? obj.title : obj.title;
        this.name = obj.name;
        this.release = obj.release;
    }
}
