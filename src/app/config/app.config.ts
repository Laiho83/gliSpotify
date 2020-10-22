import { environment } from './../../environments/environment';

export interface AppConfig {
    apiurl: string
    spotify: {
        clientId: string,
        clientSecret: string,
    }
}

export const APP_CONFIG: AppConfig = {
    apiurl: environment.apiurl,
    spotify: {
      clientId:  environment.clientId,
      clientSecret: environment.clientSecret,
    }
};
