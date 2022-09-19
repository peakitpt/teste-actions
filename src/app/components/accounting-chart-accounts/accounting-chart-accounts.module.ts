import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-chart-accounts.reducer';
import { AccountingChartAccountsEffects } from './reducers/accounting-chart-accounts.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccountingChartAccountsService } from '@peakitpt/ui-kyrios-api';
import { AccountingChartAccountsRoutingModule } from './accounting-chart-accounts-routing.module';
import { AccountingChartAccountsListComponent } from './accounting-chart-accounts-list/accounting-chart-accounts-list.component';
import { AccountingChartAccountsDetailsComponent } from './accounting-chart-accounts-details/accounting-chart-accounts-details.component';
import { AccountingChartAccountsFormComponent } from './accounting-chart-accounts-form/accounting-chart-accounts-form.component';
import { AccountingChartAccountsDeleteComponent } from './accounting-chart-accounts-delete/accounting-chart-accounts-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingChartAccountsSearchComponent } from './accounting-chart-accounts-search/accounting-chart-accounts-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as AccountingChartAccountsModalReducer } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.reducer';
import { AccountingChartAccountsModalEffects } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.effects';
import { reducer as AccountingTaxonomyCodesModalReducer } from 'src/app/shared/components/modals/accounting-taxonomy-codes-modal/reducers/accounting-taxonomy-codes-modal.reducer';
import { AccountingTaxonomyCodesModalEffects } from 'src/app/shared/components/modals/accounting-taxonomy-codes-modal/reducers/accounting-taxonomy-codes-modal.effects';

@NgModule({
  declarations: [
    AccountingChartAccountsListComponent,
    AccountingChartAccountsDetailsComponent,
    AccountingChartAccountsFormComponent,
    AccountingChartAccountsDeleteComponent,
    AccountingChartAccountsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-chart-accounts', reducer),
    EffectsModule.forFeature([AccountingChartAccountsEffects]),
    StoreModule.forFeature(
      'accounting-chart-accounts-modal',
      AccountingChartAccountsModalReducer
    ),
    EffectsModule.forFeature([AccountingChartAccountsModalEffects]),
    StoreModule.forFeature(
      'accounting-taxonomy-codes-modal',
      AccountingTaxonomyCodesModalReducer
    ),
    EffectsModule.forFeature([AccountingTaxonomyCodesModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingChartAccountsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingChartAccountsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [AccountingChartAccountsFormComponent],
})
export class AccountingChartAccountsModule {}
