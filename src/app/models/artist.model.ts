export interface Artist {
    name: string;
    genres: string[];
}

export class ArtistStateModel {
    artists: Artist[];
}

export class Test {
    obj: any;

    constructor(obj: any) {
        this.obj = obj;
    }
}
