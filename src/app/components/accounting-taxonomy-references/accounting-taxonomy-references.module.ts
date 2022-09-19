import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-taxonomy-references.reducer';
import { AccountingTaxonomyReferencesEffects } from './reducers/accounting-taxonomy-references.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccountingTaxonomyReferencesService } from '@peakitpt/ui-kyrios-api';
import { AccountingTaxonomyReferencesRoutingModule } from './accounting-taxonomy-references-routing.module';
import { AccountingTaxonomyReferencesListComponent } from './accounting-taxonomy-references-list/accounting-taxonomy-references-list.component';
import { AccountingTaxonomyReferencesDetailsComponent } from './accounting-taxonomy-references-details/accounting-taxonomy-references-details.component';
import { AccountingTaxonomyReferencesFormComponent } from './accounting-taxonomy-references-form/accounting-taxonomy-references-form.component';
import { AccountingTaxonomyReferencesDeleteComponent } from './accounting-taxonomy-references-delete/accounting-taxonomy-references-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingTaxonomyReferencesSearchComponent } from './accounting-taxonomy-references-search/accounting-taxonomy-references-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    AccountingTaxonomyReferencesListComponent,
    AccountingTaxonomyReferencesDetailsComponent,
    AccountingTaxonomyReferencesFormComponent,
    AccountingTaxonomyReferencesDeleteComponent,
    AccountingTaxonomyReferencesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-taxonomy-references', reducer),
    EffectsModule.forFeature([AccountingTaxonomyReferencesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingTaxonomyReferencesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingTaxonomyReferencesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [AccountingTaxonomyReferencesFormComponent],
})
export class AccountingTaxonomyReferencesModule {}
