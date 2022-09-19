import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-exercises.reducer';
import { AccountingExercisesEffects } from './reducers/accounting-exercises.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccountingExercisesService } from '@peakitpt/ui-kyrios-api';
import { AccountingExercisesRoutingModule } from './accounting-exercises-routing.module';
import { AccountingExercisesListComponent } from './accounting-exercises-list/accounting-exercises-list.component';
import { AccountingExercisesDetailsComponent } from './accounting-exercises-details/accounting-exercises-details.component';
import { AccountingExercisesFormComponent } from './accounting-exercises-form/accounting-exercises-form.component';
import { AccountingExercisesDeleteComponent } from './accounting-exercises-delete/accounting-exercises-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingExercisesSearchComponent } from './accounting-exercises-search/accounting-exercises-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as AccountingTaxonomyReferencesModalReducer } from 'src/app/shared/components/modals/accounting-taxonomy-references-modal/reducers/accounting-taxonomy-references-modal.reducer';
import { AccountingTaxonomyReferencesModalEffects } from 'src/app/shared/components/modals/accounting-taxonomy-references-modal/reducers/accounting-taxonomy-references-modal.effects';
import { AccountingExercisesRowMenuPipe } from './accounting-exercises-list/accounting-exercises-list-row-menu.pipe';

@NgModule({
  declarations: [
    AccountingExercisesListComponent,
    AccountingExercisesDetailsComponent,
    AccountingExercisesFormComponent,
    AccountingExercisesDeleteComponent,
    AccountingExercisesSearchComponent,
    AccountingExercisesRowMenuPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-exercises', reducer),
    EffectsModule.forFeature([AccountingExercisesEffects]),
    StoreModule.forFeature(
      'accounting-taxonomy-references-modal',
      AccountingTaxonomyReferencesModalReducer
    ),
    EffectsModule.forFeature([AccountingTaxonomyReferencesModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingExercisesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingExercisesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [AccountingExercisesFormComponent],
})
export class AccountingExercisesModule {}
