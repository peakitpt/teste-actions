import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-transaction-types.reducer';
import { AccountingTransactionTypesEffects } from './reducers/accounting-transaction-types.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccountingTransactionTypesService } from '@peakitpt/ui-kyrios-api';
import { AccountingTransactionTypesRoutingModule } from './accounting-transaction-types-routing.module';
import { AccountingTransactionTypesListComponent } from './accounting-transaction-types-list/accounting-transaction-types-list.component';
import { AccountingTransactionTypesDetailsComponent } from './accounting-transaction-types-details/accounting-transaction-types-details.component';
import { AccountingTransactionTypesFormComponent } from './accounting-transaction-types-form/accounting-transaction-types-form.component';
import { AccountingTransactionTypesDeleteComponent } from './accounting-transaction-types-delete/accounting-transaction-types-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingTransactionTypesSearchComponent } from './accounting-transaction-types-search/accounting-transaction-types-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    AccountingTransactionTypesListComponent,
    AccountingTransactionTypesDetailsComponent,
    AccountingTransactionTypesFormComponent,
    AccountingTransactionTypesDeleteComponent,
    AccountingTransactionTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-transaction-types', reducer),
    EffectsModule.forFeature([AccountingTransactionTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingTransactionTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingTransactionTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [AccountingTransactionTypesFormComponent],
})
export class AccountingTransactionTypesModule {}
