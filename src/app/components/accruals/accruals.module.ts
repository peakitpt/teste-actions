import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accruals.reducer';
import { AccrualsEffects } from './reducers/accruals.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccrualsAccrualsService } from '@peakitpt/ui-kyrios-api';
import { AccrualsRoutingModule } from './accruals-routing.module';
import { AccrualsListComponent } from './accruals-list/accruals-list.component';
import { AccrualsDetailsComponent } from './accruals-details/accruals-details.component';
import { AccrualsFormComponent } from './accruals-form/accruals-form.component';
import { AccrualsDeleteComponent } from './accruals-delete/accruals-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccrualsSearchComponent } from './accruals-search/accruals-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { reducer as AccrualTypesModalReducer } from 'src/app/shared/components/modals/accrual-types-modal/reducers/accrual-types-modal.reducer';
import { AccrualTypesModalEffects } from 'src/app/shared/components/modals/accrual-types-modal/reducers/accrual-types-modal.effects';
import { reducer as DocumentsTypesModalReducer } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { DocumentsTypesModalEffects } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.effects';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';

@NgModule({
  declarations: [
    AccrualsListComponent,
    AccrualsDetailsComponent,
    AccrualsFormComponent,
    AccrualsDeleteComponent,
    AccrualsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accruals', reducer),
    EffectsModule.forFeature([AccrualsEffects]),
    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),
    StoreModule.forFeature('accrual-types-modal', AccrualTypesModalReducer),
    EffectsModule.forFeature([AccrualTypesModalEffects]),
    StoreModule.forFeature('documents-types-modal', DocumentsTypesModalReducer),
    EffectsModule.forFeature([DocumentsTypesModalEffects]),
    StoreModule.forFeature('emoluments-modal', EmolumentsModalReducer),
    EffectsModule.forFeature([EmolumentsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccrualsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccrualsAccrualsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [AccrualsFormComponent],
})
export class AccrualsModule {}
