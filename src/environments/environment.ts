// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '@peakitpt/ui-kyrios-api';

export class EnvironmentImpl implements Environment {
  production = false;
  env = 'development';
  railsAppUrl = 'http://localhost:3000';
  apiUrl = 'http://localhost:9292/api';
  apiVersion = 'v1';
  apiUploaderUrl = 'http://localhost:9292/uploads';
  reportsUrl = 'http://localhost:4000';
  appName = 'Kyrios';
}

export const environment = new EnvironmentImpl();

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
