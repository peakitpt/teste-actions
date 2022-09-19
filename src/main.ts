import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
enableProdMode();
if (environment.production) {
  enableProdMode();

  if (['production', 'unify'].includes(environment.env)) {
    const egoiElem = window.document.createElement('script');
    egoiElem.src = 'assets/scripts/egoi.js';
    window.document.body.appendChild(egoiElem);

    const analyticsElem1 = window.document.createElement('script');
    analyticsElem1.src =
      'https://www.googletagmanager.com/gtag/js?id=UA-546688-63';
    window.document.body.appendChild(analyticsElem1);

    const analyticsElem2 = window.document.createElement('script');
    analyticsElem2.src = 'assets/scripts/analytics.js';
    window.document.body.appendChild(analyticsElem2);
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
