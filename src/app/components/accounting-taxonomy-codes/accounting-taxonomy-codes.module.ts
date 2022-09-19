import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-taxonomy-codes.reducer';
import { AccountingTaxonomyCodesEffects } from './reducers/accounting-taxonomy-codes.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccountingTaxonomyCodesService } from '@peakitpt/ui-kyrios-api';
import { AccountingTaxonomyCodesRoutingModule } from './accounting-taxonomy-codes-routing.module';
import { AccountingTaxonomyCodesListComponent } from './accounting-taxonomy-codes-list/accounting-taxonomy-codes-list.component';
import { AccountingTaxonomyCodesDetailsComponent } from './accounting-taxonomy-codes-details/accounting-taxonomy-codes-details.component';
import { AccountingTaxonomyCodesFormComponent } from './accounting-taxonomy-codes-form/accounting-taxonomy-codes-form.component';
import { AccountingTaxonomyCodesDeleteComponent } from './accounting-taxonomy-codes-delete/accounting-taxonomy-codes-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingTaxonomyCodesSearchComponent } from './accounting-taxonomy-codes-search/accounting-taxonomy-codes-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as AccountingTaxonomyReferencesModalReducer } from 'src/app/shared/components/modals/accounting-taxonomy-references-modal/reducers/accounting-taxonomy-references-modal.reducer';
import { AccountingTaxonomyReferencesModalEffects } from 'src/app/shared/components/modals/accounting-taxonomy-references-modal/reducers/accounting-taxonomy-references-modal.effects';

@NgModule({
  declarations: [
    AccountingTaxonomyCodesListComponent,
    AccountingTaxonomyCodesDetailsComponent,
    AccountingTaxonomyCodesFormComponent,
    AccountingTaxonomyCodesDeleteComponent,
    AccountingTaxonomyCodesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-taxonomy-codes', reducer),
    EffectsModule.forFeature([AccountingTaxonomyCodesEffects]),
    StoreModule.forFeature(
      'accounting-taxonomy-references-modal',
      AccountingTaxonomyReferencesModalReducer
    ),
    EffectsModule.forFeature([AccountingTaxonomyReferencesModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingTaxonomyCodesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingTaxonomyCodesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [AccountingTaxonomyCodesFormComponent],
})
export class AccountingTaxonomyCodesModule {}
