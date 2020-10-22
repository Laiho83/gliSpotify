export interface ArtistName {
    name: string;
}

export class ArtistStateModel {
    active: string;
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
    constructor(obj: any) {
        this.id = obj.id;
        this.name = obj.name ? obj.name : '';
        this.genres = obj.genres;
        this.image = obj.images[1] && obj.images[1].url ? obj.images[1].url : '/assets/default.png';
      }
}
