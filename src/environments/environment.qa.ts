import { Environment } from '@peakitpt/ui-kyrios-api';

export class EnvironmentImpl implements Environment {
  production = true;
  env = 'qa';
  railsAppUrl = 'https://portalqa.kyrioscloud.com';
  apiUrl = 'https://apiv2qa.kyrioscloud.com/api';
  apiVersion = 'v1';
  apiUploaderUrl = 'https://apiv2qa.kyrioscloud.com/uploads';
  reportsUrl = 'https://reportsqa.kyrioscloud.com';
  appName = 'Kyrios';
}

export const environment = new EnvironmentImpl();
