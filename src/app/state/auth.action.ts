import { Auth } from '../models/auth.model';

export class GetAuth {
    static readonly type = '[AUTH] Get';

    constructor(public payload: Auth) {}
}
