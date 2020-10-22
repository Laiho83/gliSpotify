import { ArtistName, AlbumId } from '../models/artist.model';

export class AddArtist {
    static readonly type = '[ARTIST] Add';

    constructor(public payload: ArtistName) {}
}

export class AddAlbumList {
    static readonly type = '[ARTIST] AddAlbums';

    constructor(public payload: AlbumId) {}
}
