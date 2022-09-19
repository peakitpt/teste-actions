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

import { reducer } from './reducers/curia-administrative-processes.reducer';
import { CuriaAdministrativeProcessesEffects } from './reducers/curia-administrative-processes.effects';
import { reducer as CuriaAdministrativeProcessTypesModalReducer } from 'src/app/shared/components/modals/curia-administrative-process-types-modal/reducers/curia-administrative-process-types-modal.reducer';
import { CuriaAdministrativeProcessTypesModalEffects } from 'src/app/shared/components/modals/curia-administrative-process-types-modal/reducers/curia-administrative-process-types-modal.effects';
import { reducer as PriestsV1ModalReducer } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { PriestsV1ModalEffects } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.effects';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';

import { CuriaAdministrativeProcessesService } from '@peakitpt/ui-kyrios-api';
import { CuriaAdministrativeProcessesRoutingModule } from './curia-administrative-processes-routing.module';
import { CuriaAdministrativeProcessesListComponent } from './curia-administrative-processes-list/curia-administrative-processes-list.component';
import { CuriaAdministrativeProcessesDetailsComponent } from './curia-administrative-processes-details/curia-administrative-processes-details.component';
import { CuriaAdministrativeProcessesFormComponent } from './curia-administrative-processes-form/curia-administrative-processes-form.component';
import { CuriaAdministrativeProcessesDeleteComponent } from './curia-administrative-processes-delete/curia-administrative-processes-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CuriaAdministrativeProcessesSearchComponent } from './curia-administrative-processes-search/curia-administrative-processes-search.component';
import { ReportsModule } from '../reports/reports.module';
import { CuriaAdministrativeProcessesFormMainTabComponent } from './curia-administrative-processes-form/curia-administrative-processes-form-main-tab/curia-administrative-processes-form-main-tab.component';
import { CuriaAdministrativeProcessesFormAttachmentsTabComponent } from './curia-administrative-processes-form/curia-administrative-processes-form-attachments-tab/curia-administrative-processes-form-attachments-tab.component';
import { CuriaAdministrativeProcessesEmitDocumentsComponent } from './curia-administrative-processes-emit-documents/curia-administrative-processes-emit-documents.component';

import { reducer as DocumentsTypesModalReducer } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { DocumentsTypesModalEffects } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.effects';
import { reducer as DocumentsReducer } from 'src/app/components/documents/reducers/documents.reducer';
import { DocumentsEffects } from 'src/app/components/documents/reducers/documents.effects';
import { PersonsModule } from '../persons/persons.module';
import { CuriaAdministrativeProcessesFormDocumentsTabComponent } from './curia-administrative-processes-form/curia-administrative-processes-form-documents-tab/curia-administrative-processes-form-documents-tab.component';
import { CuriaAdministrativeProcessTypesModule } from '../curia-administrative-process-types/curia-administrative-process-types.module';
import { CuriaAdministrativeProcessesFormPartyProvisionsTabComponent } from './curia-administrative-processes-form/curia-administrative-processes-form-party-provisions-tab/curia-administrative-processes-form-party-provisions-tab.component';
import { EmolumentsModule } from '../emoluments/emoluments.module';

@NgModule({
  declarations: [
    CuriaAdministrativeProcessesListComponent,
    CuriaAdministrativeProcessesDetailsComponent,
    CuriaAdministrativeProcessesFormComponent,
    CuriaAdministrativeProcessesDeleteComponent,
    CuriaAdministrativeProcessesSearchComponent,
    CuriaAdministrativeProcessesFormMainTabComponent,
    CuriaAdministrativeProcessesFormAttachmentsTabComponent,
    CuriaAdministrativeProcessesEmitDocumentsComponent,
    CuriaAdministrativeProcessesFormPartyProvisionsTabComponent,
    CuriaAdministrativeProcessesFormDocumentsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-administrative-processes', reducer),
    EffectsModule.forFeature([CuriaAdministrativeProcessesEffects]),

    StoreModule.forFeature(
      'curia-administrative-process-types-modal',
      CuriaAdministrativeProcessTypesModalReducer
    ),
    EffectsModule.forFeature([CuriaAdministrativeProcessTypesModalEffects]),
    StoreModule.forFeature('emoluments-modal', EmolumentsModalReducer),
    EffectsModule.forFeature([EmolumentsModalEffects]),
    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),
    StoreModule.forFeature('chapelries-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),
    StoreModule.forFeature('priests-v1-modal', PriestsV1ModalReducer),
    EffectsModule.forFeature([PriestsV1ModalEffects]),

    // Documents Reducer
    StoreModule.forFeature('documents', DocumentsReducer),
    EffectsModule.forFeature([DocumentsEffects]),
    StoreModule.forFeature('documents-types-modal', DocumentsTypesModalReducer),
    EffectsModule.forFeature([DocumentsTypesModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    CuriaAdministrativeProcessesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // Quick Insertions
    PersonsModule,
    CuriaAdministrativeProcessTypesModule,
    EmolumentsModule,
  ],
  providers: [
    CuriaAdministrativeProcessesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class CuriaAdministrativeProcessesModule {}
