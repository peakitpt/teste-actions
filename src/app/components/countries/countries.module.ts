import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/countries.reducer';
import { CountriesEffects } from './reducers/countries.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { CountriesService } from '@peakitpt/ui-kyrios-api';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountriesDetailsComponent } from './countries-details/countries-details.component';
import { CountriesFormComponent } from './countries-form/countries-form.component';
import { CountriesDeleteComponent } from './countries-delete/countries-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CountriesSearchComponent } from './countries-search/countries-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    CountriesListComponent,
    CountriesDetailsComponent,
    CountriesFormComponent,
    CountriesDeleteComponent,
    CountriesSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('countries', reducer),
    EffectsModule.forFeature([CountriesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    CountriesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule
  ],
  providers: [
    CountriesService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [
    CountriesFormComponent
  ]
})
export class CountriesModule {}
