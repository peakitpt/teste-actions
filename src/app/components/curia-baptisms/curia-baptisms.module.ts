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

import { CuriaBaptismsService } from '@peakitpt/ui-kyrios-api';
import { reducer } from './reducers/curia-baptisms.reducer';
import { CuriaBaptismsEffects } from './reducers/curia-baptisms.effects';
import { CuriaBaptismsRoutingModule } from './curia-baptisms-routing.module';
import { CuriaBaptismsListComponent } from './curia-baptisms-list/curia-baptisms-list.component';
import { CuriaBaptismsSearchComponent } from './curia-baptisms-search/curia-baptisms-search.component';
import { CuriaBaptismsDeleteComponent } from './curia-baptisms-delete/curia-baptisms-delete.component';
import { CuriaBaptismsDetailsComponent } from './curia-baptisms-details/curia-baptisms-details.component';
import { CuriaBaptismsDetailsMainTabComponent } from './curia-baptisms-details/curia-baptisms-details-main-tab/curia-baptisms-details-main-tab.component';
import { CuriaBaptismsDetailsParentsTabComponent } from './curia-baptisms-details/curia-baptisms-details-parents-tab/curia-baptisms-details-parents-tab.component';
import { CuriaBaptismsDetailsGodparentsTabComponent } from './curia-baptisms-details/curia-baptisms-details-godparents-tab/curia-baptisms-details-godparents-tab.component';
import { CuriaBaptismsDetailsAttachmentsTabComponent } from './curia-baptisms-details/curia-baptisms-details-attachments-tab/curia-baptisms-details-attachments-tab.component';
import { CuriaBaptismsFormComponent } from './curia-baptisms-form/curia-baptisms-form.component';
import { CuriaBaptismsFormMainTabComponent } from './curia-baptisms-form/curia-baptisms-form-main-tab/curia-baptisms-form-main-tab.component';
import { CuriaBaptismsFormParentsGrandparentsTabComponent } from './curia-baptisms-form/curia-baptisms-form-parents-grandparents-tab/curia-baptisms-form-parents-grandparents-tab.component';
import { CuriaBaptismsFormGodparentsTabComponent } from './curia-baptisms-form/curia-baptisms-form-godparents-tab/curia-baptisms-form-godparents-tab.component';
import { CuriaBaptismsFormAttachmentsTabComponent } from './curia-baptisms-form/curia-baptisms-form-attachments-tab/curia-baptisms-form-attachments-tab.component';

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
import { CuriaBaptismsEmitDocumentsComponent } from './curia-baptisms-emit-documents/curia-baptisms-emit-documents.component';

@NgModule({
  declarations: [
    CuriaBaptismsListComponent,
    CuriaBaptismsSearchComponent,
    CuriaBaptismsDeleteComponent,
    // DETAILS
    CuriaBaptismsDetailsComponent,
    CuriaBaptismsDetailsMainTabComponent,
    CuriaBaptismsDetailsParentsTabComponent,
    CuriaBaptismsDetailsGodparentsTabComponent,
    CuriaBaptismsDetailsAttachmentsTabComponent,
    // FORM
    CuriaBaptismsFormComponent,
    CuriaBaptismsFormMainTabComponent,
    CuriaBaptismsFormParentsGrandparentsTabComponent,
    CuriaBaptismsFormGodparentsTabComponent,
    CuriaBaptismsFormAttachmentsTabComponent,
    CuriaBaptismsEmitDocumentsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-baptisms', reducer),
    EffectsModule.forFeature([CuriaBaptismsEffects]),

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
    CuriaBaptismsRoutingModule,
    ReportsModule,

    // Quick insertions
    PersonsModule,
    EmolumentsModule,
    WorshipplacesModule,
    ChapelriesModule,
  ],
  providers: [
    CuriaBaptismsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class CuriaBaptismsModule {}
