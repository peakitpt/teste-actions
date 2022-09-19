import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-transaction-lines.reducer';
import { AccountingTransactionLinesEffects } from './reducers/accounting-transaction-lines.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { AccountingTransactionLinesService } from '@peakitpt/ui-kyrios-api';
import { AccountingTransactionLinesRoutingModule } from './accounting-transaction-lines-routing.module';
import { AccountingTransactionLinesListComponent } from './accounting-transaction-lines-list/accounting-transaction-lines-list.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingTransactionLinesSearchComponent } from './accounting-transaction-lines-search/accounting-transaction-lines-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as AccountingChartAccountsModalReducer } from '../../shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.reducer';
import { AccountingChartAccountsModalEffects } from '../../shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.effects';

@NgModule({
  declarations: [
    AccountingTransactionLinesListComponent,
    AccountingTransactionLinesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-transaction-lines', reducer),
    EffectsModule.forFeature([AccountingTransactionLinesEffects]),
    StoreModule.forFeature(
      'accounting-chart-accounts-modal',
      AccountingChartAccountsModalReducer
    ),
    EffectsModule.forFeature([AccountingChartAccountsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingTransactionLinesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingTransactionLinesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class AccountingTransactionLinesModule {}
