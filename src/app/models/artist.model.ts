export interface ArtistName {
    name: string;
}

export class ArtistStateModel {
    artists: any;
    constructor(obj: any) {
        this.artists = obj;
    }
}

export class Test {
    obj: any;

    constructor(obj: any) {
        this.obj = obj.artists;
    }
}
