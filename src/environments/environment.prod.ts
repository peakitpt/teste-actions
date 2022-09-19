import { Environment } from '@peakitpt/ui-kyrios-api';

export class EnvironmentImpl implements Environment {
  production = true;
  env = 'production';
  railsAppUrl = 'https://portal.kyrioscloud.com';
  apiUrl = 'https://apiv2.kyrioscloud.com/api';
  apiVersion = 'v1';
  apiUploaderUrl = 'https://apiv2.kyrioscloud.com/uploads';
  reportsUrl = 'https://reports.kyrioscloud.com';
  appName = 'Kyrios';
}

export const environment = new EnvironmentImpl();
