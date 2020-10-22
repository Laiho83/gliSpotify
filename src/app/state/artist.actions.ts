import { ArtistName } from '../models/artist.model';

export class AddArtist {
    static readonly type = '[ARTIST] Add';

    constructor(public payload: ArtistName) {}
}
