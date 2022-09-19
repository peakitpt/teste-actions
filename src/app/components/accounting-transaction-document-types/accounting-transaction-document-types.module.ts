import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-transaction-document-types.reducer';
import { AccountingTransactionDocumentTypesEffects } from './reducers/accounting-transaction-document-types.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { AccountingTransactionDocumentTypesService } from '@peakitpt/ui-kyrios-api';
import { AccountingTransactionDocumentTypesRoutingModule } from './accounting-transaction-document-types-routing.module';
import { AccountingTransactionDocumentTypesListComponent } from './accounting-transaction-document-types-list/accounting-transaction-document-types-list.component';
import { AccountingTransactionDocumentTypesDetailsComponent } from './accounting-transaction-document-types-details/accounting-transaction-document-types-details.component';
import { AccountingTransactionDocumentTypesFormComponent } from './accounting-transaction-document-types-form/accounting-transaction-document-types-form.component';
import { AccountingTransactionDocumentTypesDeleteComponent } from './accounting-transaction-document-types-delete/accounting-transaction-document-types-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingTransactionDocumentTypesSearchComponent } from './accounting-transaction-document-types-search/accounting-transaction-document-types-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    AccountingTransactionDocumentTypesListComponent,
    AccountingTransactionDocumentTypesDetailsComponent,
    AccountingTransactionDocumentTypesFormComponent,
    AccountingTransactionDocumentTypesDeleteComponent,
    AccountingTransactionDocumentTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-transaction-document-types', reducer),
    EffectsModule.forFeature([AccountingTransactionDocumentTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingTransactionDocumentTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingTransactionDocumentTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class AccountingTransactionDocumentTypesModule {}
