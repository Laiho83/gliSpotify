import { ArtistName } from '../models/artist.model';

export class AddArtist {
    static readonly type = '[ARTIST] Add';

    constructor(public payload: ArtistName) {}
}

export class RemoveArtist {
    static readonly type = '[ARTIST] Remove';

    constructor(public payload: string) {}
}