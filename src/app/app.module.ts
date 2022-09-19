import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  I18NextModule,
  ITranslationService,
  I18NEXT_SERVICE,
  defaultInterpolationFormat,
} from 'angular-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from './auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Environment } from '@peakitpt/ui-kyrios-api';
import { environment } from 'src/environments/environment';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { SnackBarService } from '@peakitpt/ui-material';
import { MatSnackBar } from '@angular/material/snack-bar';

// Empty locale in case of no locale
registerLocaleData(localePt, '', localePtExtra);
registerLocaleData(localePt, localePtExtra);
registerLocaleData(localeEs, localeEsExtra);
registerLocaleData(localeEn, localeEnExtra);

export function appInit(i18next: ITranslationService) {
  return () =>
    i18next
      .use(Backend)
      .use(LanguageDetector)
      .init({
        whitelist: ['pt', 'es', 'en'],
        fallbackLng: 'pt',
        debug: false,
        returnEmptyString: false,
        ns: [
          // Base
          'ui-material',
          'translation',
          'validation',
          'error',
          'login',
          // Modules
          'dashboard',
          'countries',
          'formation-types',
          'formations',
          'text-messages',
          'sections',
          'groups',
          'patrons',
          'newsletters',
          'newsletters-layouts',
          'newsletter-subscriptions',
          'newsletter-group-subscriptions',
          'acolytes',
          'pastoral-agents',
          'pastoral-agents-types',
          'readers',
          'mecs',
          'families',
          'persons',
          'bishoprics',
          'archpristships',
          'chapelries',
          'worshipplaces',
          'reports-groups',
          'subscriptions',
          'users',
          'subscription-users',
          'reports',
          'reports-permissions',
          'emenus',
          'websiteconfigurations',
          'contents',
          'events',
          'documents',
          'parishioners',
          'catechisms',
          'deaths',
          'mass-intentions',
          'mass-intentions-types',
          'subscription-statistics',
          'admin-statistics',
          'reportmanagments',
          'numerations',
          'numerations-views',
          'emoluments',
          'emoluments-types',
          'relationship-degrees',
          'new-records-importer',
          'priests',
          'subscription-layouts',
          'valences',
          'user-newsletters',
          'curia-functions',
          'places',
          'module-documentation-links',
          'institutions',
          'layouts',
          'reports-groupers',
          'records-importers',
          'emoluments-types',
          'numerations-views',
          'gestdocuments',
          'subscription-settings',
          'documents-types',
          'catholic-directory-priests',
          'catholic-directory-institutions',
          'catechumens',
          'baptisms',
          'weddings',
          'curia-weddings',
          'chrisms',
          'accruals',
          'accruals-types',
          'current-accounts-receipts',
          'accruals-processments',
          'accounting-chart-accounts',
          'accounting-taxonomy-codes',
          'accounting-exercises',
          'accounting-taxonomy-references',
          'current-accounts',
          'accounting-cost-centers',
          'treasury-locations',
          'accounting-transactions',
          'accounting-transaction-document-types',
          'accounting-journals',
          'clergy-types',
          'accounting-transactions',
          'accounting-balance-sheets',
          'accounting-transaction-lines',
          'accounting-transaction-types',
          'nominations',
          'gdprs',
          'curia-secretariats',
          'curia-secretariat-types',
          'curia-administrative-processes',
          'curia-economic-councils',
          'curia-provisions',
          'institution-types',
          'curia-baptisms',
          'curia-ministries-and-orders',
          'curia-administrative-process-types',
          'module-documentation-links',
          'parishioner-processes',
          'views',
          'entitys-access',
          'curia-provision-types',
          'change-password',
          'appointment-types',
          'bishopric-integrated-views',
          'pending-entities',
        ],
        defaultNS: '',
        interpolation: {
          format: I18NextModule.interpolationFormat(defaultInterpolationFormat),
        },
        backend: {
          loadPath: 'assets/locales/{{ns}}/{{ns}}.{{lng}}.json',
        },
        // lang detection plugin options
        detection: {
          // order and from where user language should be detected
          order: ['querystring', 'cookie'],
          // keys or params to lookup language from
          lookupCookie: 'kyrios_lang',
          lookupQuerystring: 'kyrios_lng',
          // cache user language on
          caches: ['localStorage', 'cookie'],
          // optional expire and domain for set cookie
          cookieMinutes: 10080, // 7 days
        },
      });
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true,
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    TranslateModule.forRoot(),
    I18NextModule.forRoot(),
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    OverlayModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        },
      },
    }),
  ],
  providers: [
    Title,
    I18N_PROVIDERS,
    AuthGuard,
    JwtHelperService,
    SharedModule,
    DatePipe,
    SnackBarService,
    MatSnackBar,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true,
    // },
    {
      provide: Environment,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
