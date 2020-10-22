import { Artist } from '../models/artist.model';

export class AddArtist {
    static readonly type = '[ARTIST] Add';

    constructor(public payload: Artist) {}
}

export class RemoveArtist {
    static readonly type = '[ARTIST] Remove';

    constructor(public payload: string) {}
}