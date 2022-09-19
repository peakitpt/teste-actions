import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-transactions.reducer';
import { AccountingTransactionsEffects } from './reducers/accounting-transactions.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccountingTransactionsService } from '@peakitpt/ui-kyrios-api';
import { AccountingTransactionsRoutingModule } from './accounting-transactions-routing.module';
import { AccountingTransactionsListComponent } from './accounting-transactions-list/accounting-transactions-list.component';
import { AccountingTransactionsDetailsComponent } from './accounting-transactions-details/accounting-transactions-details.component';
import { AccountingTransactionsFormComponent } from './accounting-transactions-form/accounting-transactions-form.component';
import { AccountingTransactionsDeleteComponent } from './accounting-transactions-delete/accounting-transactions-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingTransactionsSearchComponent } from './accounting-transactions-search/accounting-transactions-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as AccountingCostCentersModalReducer } from 'src/app/shared/components/modals/accounting-cost-centers-modal/reducers/accounting-cost-centers-modal.reducer';
import { AccountingCostCentersModalEffects } from 'src/app/shared/components/modals/accounting-cost-centers-modal/reducers/accounting-cost-centers-modal.effects';
import { reducer as AccountingJournalsModalReducer } from 'src/app/shared/components/modals/accounting-journals-modal/reducers/accounting-journals-modal.reducer';
import { AccountingJournalsModalEffects } from 'src/app/shared/components/modals/accounting-journals-modal/reducers/accounting-journals-modal.effects';
import { reducer as AccountingTransactionDocumentTypesModalReducer } from 'src/app/shared/components/modals/accounting-transaction-document-types-modal/reducers/accounting-transaction-document-types-modal.reducer';
import { AccountingTransactionDocumentTypesModalEffects } from 'src/app/shared/components/modals/accounting-transaction-document-types-modal/reducers/accounting-transaction-document-types-modal.effects';
import { reducer as AccountingChartAccountsModalReducer } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.reducer';
import { AccountingChartAccountsModalEffects } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.effects';

// QUICK INSERTS
import { AccountingTransactionDocumentTypesModule } from '../accounting-transaction-document-types/accounting-transaction-document-types.module';
import { AccountingJournalsModule } from '../accounting-journals/accounting-journals.module';
import { AccountingChartAccountsModule } from '../accounting-chart-accounts/accounting-chart-accounts.module';
import { AccountingCostCentersModule } from '../accounting-cost-centers/accounting-cost-centers.module';

@NgModule({
  declarations: [
    AccountingTransactionsListComponent,
    AccountingTransactionsDetailsComponent,
    AccountingTransactionsFormComponent,
    AccountingTransactionsDeleteComponent,
    AccountingTransactionsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-transactions', reducer),
    EffectsModule.forFeature([AccountingTransactionsEffects]),
    StoreModule.forFeature(
      'accounting-cost-centers-modal',
      AccountingCostCentersModalReducer
    ),
    EffectsModule.forFeature([AccountingCostCentersModalEffects]),
    StoreModule.forFeature(
      'accounting-journals-modal',
      AccountingJournalsModalReducer
    ),
    StoreModule.forFeature(
      'accounting-chart-accounts-modal',
      AccountingChartAccountsModalReducer
    ),
    EffectsModule.forFeature([AccountingChartAccountsModalEffects]),
    EffectsModule.forFeature([AccountingJournalsModalEffects]),
    StoreModule.forFeature(
      'accounting-transaction-document-types-modal',
      AccountingTransactionDocumentTypesModalReducer
    ),
    EffectsModule.forFeature([AccountingTransactionDocumentTypesModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingTransactionsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // QUICK INSERT
    AccountingTransactionDocumentTypesModule,
    AccountingJournalsModule,
    AccountingChartAccountsModule,
    AccountingCostCentersModule,
  ],
  providers: [
    AccountingTransactionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [AccountingTransactionsFormComponent],
})
export class AccountingTransactionsModule {}
