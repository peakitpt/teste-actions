import { Environment } from '@peakitpt/ui-kyrios-api';

export class EnvironmentImpl implements Environment {
  production = true;
  env = 'unify';
  railsAppUrl = 'https://portal.unifychms.com';
  apiUrl = 'https://apiv2.unifychms.com/api';
  apiVersion = 'v1';
  apiUploaderUrl = 'https://apiv2.unifychms.com/uploads';
  reportsUrl = 'https://reports.unifychms.com';
  appName = 'Unify';
}

export const environment = new EnvironmentImpl();
