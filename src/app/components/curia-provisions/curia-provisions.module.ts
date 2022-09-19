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

import { reducer } from './reducers/curia-provisions.reducer';
import { CuriaProvisionsEffects } from './reducers/curia-provisions.effects';
import { reducer as CuriaFunctionsModalReducer } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { CuriaFunctionsModalEffects } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.effects';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as PriestsV1ModalReducer } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { PriestsV1ModalEffects } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.effects';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';
import { reducer as CuriaProvisionTypesModalReducer } from 'src/app/shared/components/modals/curia-provision-types-modal/reducers/curia-provision-types-modal.reducer';
import { CuriaProvisionTypesModalEffects } from 'src/app/shared/components/modals/curia-provision-types-modal/reducers/curia-provision-types-modal.effects';

import { CuriaProvisionsService } from '@peakitpt/ui-kyrios-api';
import { CuriaProvisionsRoutingModule } from './curia-provisions-routing.module';
import { CuriaProvisionsListComponent } from './curia-provisions-list/curia-provisions-list.component';
import { CuriaProvisionsDetailsComponent } from './curia-provisions-details/curia-provisions-details.component';
import { CuriaProvisionsFormComponent } from './curia-provisions-form/curia-provisions-form.component';
import { CuriaProvisionsDeleteComponent } from './curia-provisions-delete/curia-provisions-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CuriaProvisionsSearchComponent } from './curia-provisions-search/curia-provisions-search.component';
import { ReportsModule } from '../reports/reports.module';
import { CuriaProvisionsFormMainTabComponent } from './curia-provisions-form/curia-provisions-form-main-tab/curia-provisions-form-main-tab.component';
import { CuriaProvisionsFormAttachmentsTabComponent } from './curia-provisions-form/curia-provisions-form-attachments-tab/curia-provisions-form-attachments-tab.component';
import { CuriaProvisionsEmitDocumentsComponent } from './curia-provisions-emit-documents/curia-provisions-emit-documents.component';

import { reducer as DocumentsTypesModalReducer } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { DocumentsTypesModalEffects } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.effects';
import { reducer as DocumentsReducer } from 'src/app/components/documents/reducers/documents.reducer';
import { DocumentsEffects } from 'src/app/components/documents/reducers/documents.effects';
import { PersonsModule } from '../persons/persons.module';
import { CuriaProvisionsFormMembersTabComponent } from './curia-provisions-form/curia-provisions-form-members-tab/curia-provisions-form-members-tab.component';
import { EmolumentsModule } from '../emoluments/emoluments.module';

@NgModule({
  declarations: [
    CuriaProvisionsListComponent,
    CuriaProvisionsDetailsComponent,
    CuriaProvisionsFormComponent,
    CuriaProvisionsDeleteComponent,
    CuriaProvisionsSearchComponent,
    CuriaProvisionsFormMainTabComponent,
    CuriaProvisionsFormAttachmentsTabComponent,
    CuriaProvisionsEmitDocumentsComponent,
    CuriaProvisionsFormMembersTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-provisions', reducer),
    EffectsModule.forFeature([CuriaProvisionsEffects]),

    StoreModule.forFeature('curia-functions-modal', CuriaFunctionsModalReducer),
    EffectsModule.forFeature([CuriaFunctionsModalEffects]),
    StoreModule.forFeature('emoluments-modal', EmolumentsModalReducer),
    EffectsModule.forFeature([EmolumentsModalEffects]),
    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),
    StoreModule.forFeature('chapelries-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),
    StoreModule.forFeature('priests-v1-modal', PriestsV1ModalReducer),
    EffectsModule.forFeature([PriestsV1ModalEffects]),
    StoreModule.forFeature(
      'curia-provision-types-modal',
      CuriaProvisionTypesModalReducer
    ),
    EffectsModule.forFeature([CuriaProvisionTypesModalEffects]),

    // Documents Reducer
    StoreModule.forFeature('documents', DocumentsReducer),
    EffectsModule.forFeature([DocumentsEffects]),
    StoreModule.forFeature('documents-types-modal', DocumentsTypesModalReducer),
    EffectsModule.forFeature([DocumentsTypesModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    CuriaProvisionsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // Quick Insertions
    PersonsModule,
    EmolumentsModule,
  ],
  providers: [
    CuriaProvisionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class CuriaProvisionsModule {}
