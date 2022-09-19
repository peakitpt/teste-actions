import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-balance-sheets.reducer';
import { AccountingBalanceSheetsEffects } from './reducers/accounting-balance-sheets.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccountingBalanceSheetsService } from '@peakitpt/ui-kyrios-api';
import { AccountingBalanceSheetsRoutingModule } from './accounting-balance-sheets-routing.module';
import { AccountingBalanceSheetsListComponent } from './accounting-balance-sheets-list/accounting-balance-sheets-list.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingBalanceSheetsSearchComponent } from './accounting-balance-sheets-search/accounting-balance-sheets-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    AccountingBalanceSheetsListComponent,
    AccountingBalanceSheetsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-balance-sheets', reducer),
    EffectsModule.forFeature([AccountingBalanceSheetsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingBalanceSheetsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingBalanceSheetsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class AccountingBalanceSheetsModule {}
