import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/catholic-directory-priests.reducer';
import { CatholicDirectoryPriestsEffects } from './reducers/catholic-directory-priests.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { CatholicDirectoryPriestsService } from '@peakitpt/ui-kyrios-api';
import { CatholicDirectoryPriestsRoutingModule } from './catholic-directory-priests-routing.module';
import { CatholicDirectoryPriestsListComponent } from './catholic-directory-priests-list/catholic-directory-priests-list.component';
import { CatholicDirectoryPriestsDetailsComponent } from './catholic-directory-priests-details/catholic-directory-priests-details.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CatholicDirectoryPriestsSearchComponent } from './catholic-directory-priests-search/catholic-directory-priests-search.component';

@NgModule({
  declarations: [
    CatholicDirectoryPriestsListComponent,
    CatholicDirectoryPriestsDetailsComponent,
    CatholicDirectoryPriestsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('catholic-directory-priests', reducer),
    EffectsModule.forFeature([CatholicDirectoryPriestsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    CatholicDirectoryPriestsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    CatholicDirectoryPriestsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class CatholicDirectoryPriestsModule {}
