import { Environment } from '@peakitpt/ui-kyrios-api';

export class EnvironmentImpl implements Environment {
  production = true;
  env = 'beta';
  railsAppUrl = 'https://portalbeta.kyrioscloud.com';
  apiUrl = 'https://apiv2beta.kyrioscloud.com/api';
  apiVersion = 'v1';
  apiUploaderUrl = 'https://apiv2beta.kyrioscloud.com/uploads';
  reportsUrl = 'https://reportsbeta.kyrioscloud.com';
  appName = 'Kyrios';
}

export const environment = new EnvironmentImpl();
