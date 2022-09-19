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

import { reducer } from './reducers/curia-economic-councils.reducer';
import { CuriaEconomicCouncilsEffects } from './reducers/curia-economic-councils.effects';
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

import { CuriaEconomicCouncilsService } from '@peakitpt/ui-kyrios-api';
import { CuriaEconomicCouncilsRoutingModule } from './curia-economic-councils-routing.module';
import { CuriaEconomicCouncilsListComponent } from './curia-economic-councils-list/curia-economic-councils-list.component';
import { CuriaEconomicCouncilsDetailsComponent } from './curia-economic-councils-details/curia-economic-councils-details.component';
import { CuriaEconomicCouncilsFormComponent } from './curia-economic-councils-form/curia-economic-councils-form.component';
import { CuriaEconomicCouncilsDeleteComponent } from './curia-economic-councils-delete/curia-economic-councils-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CuriaEconomicCouncilsSearchComponent } from './curia-economic-councils-search/curia-economic-councils-search.component';
import { ReportsModule } from '../reports/reports.module';
import { CuriaEconomicCouncilsFormMainTabComponent } from './curia-economic-councils-form/curia-economic-councils-form-main-tab/curia-economic-councils-form-main-tab.component';
import { CuriaEconomicCouncilsFormAttachmentsTabComponent } from './curia-economic-councils-form/curia-economic-councils-form-attachments-tab/curia-economic-councils-form-attachments-tab.component';
import { CuriaEconomicCouncilsEmitDocumentsComponent } from './curia-economic-councils-emit-documents/curia-economic-councils-emit-documents.component';

import { reducer as DocumentsTypesModalReducer } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { DocumentsTypesModalEffects } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.effects';
import { reducer as DocumentsReducer } from 'src/app/components/documents/reducers/documents.reducer';
import { DocumentsEffects } from 'src/app/components/documents/reducers/documents.effects';
import { PersonsModule } from '../persons/persons.module';
import { CuriaEconomicCouncilsFormDocumentsTabComponent } from './curia-economic-councils-form/curia-economic-councils-form-documents-tab/curia-economic-councils-form-documents-tab.component';
import { EmolumentsModule } from '../emoluments/emoluments.module';

@NgModule({
  declarations: [
    CuriaEconomicCouncilsListComponent,
    CuriaEconomicCouncilsDetailsComponent,
    CuriaEconomicCouncilsFormComponent,
    CuriaEconomicCouncilsDeleteComponent,
    CuriaEconomicCouncilsSearchComponent,
    CuriaEconomicCouncilsFormMainTabComponent,
    CuriaEconomicCouncilsFormAttachmentsTabComponent,
    CuriaEconomicCouncilsEmitDocumentsComponent,
    CuriaEconomicCouncilsFormDocumentsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-economic-councils', reducer),
    EffectsModule.forFeature([CuriaEconomicCouncilsEffects]),

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

    // Documents Reducer
    StoreModule.forFeature('documents', DocumentsReducer),
    EffectsModule.forFeature([DocumentsEffects]),
    StoreModule.forFeature('documents-types-modal', DocumentsTypesModalReducer),
    EffectsModule.forFeature([DocumentsTypesModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    CuriaEconomicCouncilsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // Quick Insertions
    PersonsModule,
    EmolumentsModule,
  ],
  providers: [
    CuriaEconomicCouncilsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class CuriaEconomicCouncilsModule {}
