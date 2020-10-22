export interface ArtistName {
    name: string;
}

export class ArtistStateModel {
    items: ArtistData;
}

export class ArtistData {
    name: string;
    genres: string[];
    image: {
        width: string;
        height: string;
        url: string;
    };
    obj: any;
    constructor(obj: any) {
        this.name = obj.name ? obj.name : '';
        this.genres = obj.genres;
        this.image = obj.images[1] && obj.images[1].url ? obj.images[1].url : null;
      }
}
