// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth_microservice: 'http://localhost:2000',
  loc_microservice: 'http://localhost:2001',
  account_microservice: 'http://localhost:2002',
  // account_microservice: 'https://130.211.207.174/accountsbe',
  // auth_microservice: 'https://130.211.207.174/auth',
  // loc_microservice: 'https://130.211.207.174/loc'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
