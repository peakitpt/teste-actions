import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/treasury-locations.reducer';
import { TreasuryLocationsEffects } from './reducers/treasury-locations.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { TreasuryLocationsService } from '@peakitpt/ui-kyrios-api';
import { TreasuryLocationsRoutingModule } from './treasury-locations-routing.module';
import { TreasuryLocationsListComponent } from './treasury-locations-list/treasury-locations-list.component';
import { TreasuryLocationsDetailsComponent } from './treasury-locations-details/treasury-locations-details.component';
import { TreasuryLocationsFormComponent } from './treasury-locations-form/treasury-locations-form.component';
import { TreasuryLocationsDeleteComponent } from './treasury-locations-delete/treasury-locations-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { TreasuryLocationsSearchComponent } from './treasury-locations-search/treasury-locations-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    TreasuryLocationsListComponent,
    TreasuryLocationsDetailsComponent,
    TreasuryLocationsFormComponent,
    TreasuryLocationsDeleteComponent,
    TreasuryLocationsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('treasury-locations', reducer),
    EffectsModule.forFeature([TreasuryLocationsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    TreasuryLocationsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    TreasuryLocationsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [TreasuryLocationsFormComponent],
})
export class TreasuryLocationsModule {}
