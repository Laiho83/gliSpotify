# GliSpotify

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Production
This is the link to working version: [https://laiho83.github.io/gliSpotify/home](https://laiho83.github.io/gliSpotify/home)

## Steps to run the app

1. Clone the repository: `git clone https://github.com/Laiho83/gliSpotify.git`
2. In the root folder run: `yarn install`
3. Run `ng serve --configuration local` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
4. Login to Spotify --> Redirect uri back to homepage

## Spotify api login
Add this data to environment variables:
- apiurl: Redirect Uri: [APP_URI]/access_token
- clientId: clientId
- clientSecret: clientSecret

To get this data create an APP on `https://developer.spotify.com/dashboard/applications`
clientId and clientSecret are created for you just copy paste them to apropriare Environment variables
RedirectUri has to be added to whitelist under Edit Settings.