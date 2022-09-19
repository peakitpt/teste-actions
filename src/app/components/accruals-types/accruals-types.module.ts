import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accruals-types.reducer';
import { AccrualTypesEffects } from './reducers/accruals-types.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccrualsTypesService } from '@peakitpt/ui-kyrios-api';
import { AccrualsTypesRoutingModule } from './accruals-types-routing.module';
import { AccrualsTypesListComponent } from './accruals-types-list/accruals-types-list.component';
import { AccrualsTypesDetailsComponent } from './accruals-types-details/accruals-types-details.component';
import { AccrualsTypesFormComponent } from './accruals-types-form/accruals-types-form.component';
import { AccrualsTypesDeleteComponent } from './accruals-types-delete/accruals-types-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccrualsTypesSearchComponent } from './accruals-types-search/accruals-types-search.component';
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
    AccrualsTypesListComponent,
    AccrualsTypesDetailsComponent,
    AccrualsTypesFormComponent,
    AccrualsTypesDeleteComponent,
    AccrualsTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accruals-types', reducer),
    EffectsModule.forFeature([AccrualTypesEffects]),
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
    AccrualsTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccrualsTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [AccrualsTypesFormComponent],
})
export class AccrualsTypesModule {}
