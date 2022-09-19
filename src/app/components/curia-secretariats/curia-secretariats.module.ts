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

import { reducer } from './reducers/curia-secretariats.reducer';
import { CuriaSecretariatsEffects } from './reducers/curia-secretariats.effects';
import { reducer as CuriaFunctionsModalReducer } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { CuriaFunctionsModalEffects } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.effects';
import { reducer as CuriaSecretariatTypesModalReducer } from 'src/app/shared/components/modals/curia-secretariat-types-modal/reducers/curia-secretariat-types-modal.reducer';
import { CuriaSecretariatTypesModalEffects } from 'src/app/shared/components/modals/curia-secretariat-types-modal/reducers/curia-secretariat-types-modal.effects';
import { reducer as WorshipplacesModalReducer } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { reducer as PriestsV1ModalReducer } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { PriestsV1ModalEffects } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.effects';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';

import { CuriaSecretariatsService } from '@peakitpt/ui-kyrios-api';
import { CuriaSecretariatsRoutingModule } from './curia-secretariats-routing.module';
import { CuriaSecretariatsListComponent } from './curia-secretariats-list/curia-secretariats-list.component';
import { CuriaSecretariatsDetailsComponent } from './curia-secretariats-details/curia-secretariats-details.component';
import { CuriaSecretariatsFormComponent } from './curia-secretariats-form/curia-secretariats-form.component';
import { CuriaSecretariatsDeleteComponent } from './curia-secretariats-delete/curia-secretariats-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CuriaSecretariatsSearchComponent } from './curia-secretariats-search/curia-secretariats-search.component';
import { ReportsModule } from '../reports/reports.module';
import { CuriaSecretariatsFormMainTabComponent } from './curia-secretariats-form/curia-secretariats-form-main-tab/curia-secretariats-form-main-tab.component';
import { CuriaSecretariatsFormAttachmentsTabComponent } from './curia-secretariats-form/curia-secretariats-form-attachments-tab/curia-secretariats-form-attachments-tab.component';
import { CuriaSecretariatsEmitDocumentsComponent } from './curia-secretariats-emit-documents/curia-secretariats-emit-documents.component';

import { reducer as DocumentsTypesModalReducer } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { DocumentsTypesModalEffects } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.effects';
import { reducer as DocumentsReducer } from 'src/app/components/documents/reducers/documents.reducer';
import { DocumentsEffects } from 'src/app/components/documents/reducers/documents.effects';
import { PersonsModule } from '../persons/persons.module';
import { CuriaSecretariatsFormDocumentsTabComponent } from './curia-secretariats-form/curia-secretariats-form-documents-tab/curia-secretariats-form-documents-tab.component';
import { EmolumentsModule } from '../emoluments/emoluments.module';

@NgModule({
  declarations: [
    CuriaSecretariatsListComponent,
    CuriaSecretariatsDetailsComponent,
    CuriaSecretariatsFormComponent,
    CuriaSecretariatsDeleteComponent,
    CuriaSecretariatsSearchComponent,
    CuriaSecretariatsFormMainTabComponent,
    CuriaSecretariatsFormAttachmentsTabComponent,
    CuriaSecretariatsEmitDocumentsComponent,
    CuriaSecretariatsFormDocumentsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-secretariats', reducer),
    EffectsModule.forFeature([CuriaSecretariatsEffects]),

    StoreModule.forFeature('curia-functions-modal', CuriaFunctionsModalReducer),
    EffectsModule.forFeature([CuriaFunctionsModalEffects]),
    StoreModule.forFeature(
      'curia-secretariat-types-modal',
      CuriaSecretariatTypesModalReducer
    ),
    EffectsModule.forFeature([CuriaSecretariatTypesModalEffects]),
    StoreModule.forFeature('emoluments-modal', EmolumentsModalReducer),
    EffectsModule.forFeature([EmolumentsModalEffects]),
    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),
    StoreModule.forFeature('worshipplaces-modal', WorshipplacesModalReducer),
    EffectsModule.forFeature([WorshipplacesModalEffects]),
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
    CuriaSecretariatsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // Quick Insertions
    PersonsModule,
    EmolumentsModule,
  ],
  providers: [
    CuriaSecretariatsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class CuriaSecretariatsModule {}
