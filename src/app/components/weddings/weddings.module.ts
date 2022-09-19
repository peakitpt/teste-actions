import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportsModule } from '../reports/reports.module';

import { WeddingsService } from '@peakitpt/ui-kyrios-api';
import { reducer } from './reducers/weddings.reducer';
import { WeddingsEffects } from './reducers/weddings.effects';
import { WeddingsRoutingModule } from './weddings-routing.module';
import { WeddingsListComponent } from './weddings-list/weddings-list.component';
import { WeddingsSearchComponent } from './weddings-search/weddings-search.component';
import { WeddingsDeleteComponent } from './weddings-delete/weddings-delete.component';
// DETAILS
import { WeddingsDetailsComponent } from './weddings-details/weddings-details.component';
import { WeddingsDetailsWeddingTabComponent } from './weddings-details/weddings-details-wedding-tab/weddings-details-wedding-tab.component';
import { WeddingsDetailsGroomsTabComponent } from './weddings-details/weddings-details-grooms-tab/weddings-details-grooms-tab.component';
import { WeddingsDetailsSeatDuplicateTabComponent } from './weddings-details/weddings-details-seat-duplicate-tab/weddings-details-seat-duplicate-tab.component';
import { WeddingsDetailsMod1TabComponent } from './weddings-details/weddings-details-mod1-tab/weddings-details-mod1-tab.component';
import { WeddingsDetailsMod2TabComponent } from './weddings-details/weddings-details-mod2-tab/weddings-details-mod2-tab.component';
import { WeddingsDetailsReportsTabComponent } from './weddings-details/weddings-form-reports-tab/weddings-details-reports-tab.component';
import { WeddingsDetailsAttachmentsTabComponent } from './weddings-details/weddings-details-attachments-tab/weddings-details-attachments-tab.component';
// FORM
import { WeddingsFormComponent } from './weddings-form/weddings-form.component';
import { WeddingsFormWeddingTabComponent } from './weddings-form/weddings-form-wedding-tab/weddings-form-wedding-tab.component';
import { WeddingsFormGroomsTabComponent } from './weddings-form/weddings-form-grooms-tab/weddings-form-grooms-tab.component';
import { WeddingsFormSeatDuplicateTabComponent } from './weddings-form/weddings-form-seat-duplicate-tab/weddings-form-seat-duplicate-tab.component';
import { WeddingsFormMod1TabComponent } from './weddings-form/weddings-form-mod1-tab/weddings-form-mod1-tab.component';
import { WeddingsFormMod2TabComponent } from './weddings-form/weddings-form-mod2-tab/weddings-form-mod2-tab.component';
import { WeddingsFormReportsTabComponent } from './weddings-form/weddings-form-reports-tab/weddings-form-reports-tab.component';
import { WeddingsFormAttachmentsTabComponent } from './weddings-form/weddings-form-attachments-tab/weddings-form-attachments-tab.component';

import { PersonsModule } from '../persons/persons.module';
import { reducer as PersonsModalReducer } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { PersonsModalEffects } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.effects';

import { EmolumentsModule } from '../emoluments/emoluments.module';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';

import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';

import { WorshipplacesModule } from '../worshipplaces/worshipplaces.module';
import { reducer as WorshipplacesModalReducer } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';

import { reducer as PriestsAndPersonsModalReducer } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.reducer';
import { PriestsAndPersonsModalEffects } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.effects';

import { reducer as PriestsModalReducer } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.reducer';
import { PriestsModalEffects } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.effects';

import { ChapelriesModule } from '../chapelries/chapelries.module';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as DocumentsTypesModalReducer } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { DocumentsTypesModalEffects } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.effects';
import { reducer as DocumentsReducer } from 'src/app/components/documents/reducers/documents.reducer';
import { DocumentsEffects } from 'src/app/components/documents/reducers/documents.effects';
import { WeddingsEmitDocumentsComponent } from './weddings-emit-documents/weddings-emit-documents.component';

@NgModule({
  declarations: [
    WeddingsListComponent,
    WeddingsSearchComponent,
    WeddingsDeleteComponent,
    // DETAILS
    WeddingsDetailsComponent,
    WeddingsDetailsWeddingTabComponent,
    WeddingsDetailsGroomsTabComponent,
    WeddingsDetailsSeatDuplicateTabComponent,
    WeddingsDetailsMod1TabComponent,
    WeddingsDetailsMod2TabComponent,
    WeddingsDetailsReportsTabComponent,
    WeddingsDetailsAttachmentsTabComponent,
    WeddingsEmitDocumentsComponent,
    // FORM
    WeddingsFormComponent,
    WeddingsFormWeddingTabComponent,
    WeddingsFormGroomsTabComponent,
    WeddingsFormSeatDuplicateTabComponent,
    WeddingsFormMod1TabComponent,
    WeddingsFormMod2TabComponent,
    WeddingsFormReportsTabComponent,
    WeddingsFormAttachmentsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('weddings', reducer),
    EffectsModule.forFeature([WeddingsEffects]),

    StoreModule.forFeature('persons-modal', PersonsModalReducer),
    EffectsModule.forFeature([PersonsModalEffects]),

    StoreModule.forFeature('emoluments-modal', EmolumentsModalReducer),
    EffectsModule.forFeature([EmolumentsModalEffects]),

    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),

    StoreModule.forFeature('worshipplaces-modal', WorshipplacesModalReducer),
    EffectsModule.forFeature([WorshipplacesModalEffects]),

    StoreModule.forFeature(
      'priests-and-persons-modal',
      PriestsAndPersonsModalReducer
    ),
    EffectsModule.forFeature([PriestsAndPersonsModalEffects]),

    StoreModule.forFeature('priests-modal', PriestsModalReducer),
    EffectsModule.forFeature([PriestsModalEffects]),

    StoreModule.forFeature('chapelries-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),

    // Documents Reducer
    StoreModule.forFeature('documents', DocumentsReducer),
    EffectsModule.forFeature([DocumentsEffects]),
    StoreModule.forFeature('documents-types-modal', DocumentsTypesModalReducer),
    EffectsModule.forFeature([DocumentsTypesModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    WeddingsRoutingModule,
    ReportsModule,

    // Quick insertions
    PersonsModule,
    EmolumentsModule,
    WorshipplacesModule,
    ChapelriesModule,
  ],
  providers: [
    WeddingsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class WeddingsModule {}
