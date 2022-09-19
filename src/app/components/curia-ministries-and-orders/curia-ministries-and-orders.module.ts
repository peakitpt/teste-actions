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

import { reducer } from './reducers/curia-ministries-and-orders.reducer';
import { CuriaMinistriesAndOrdersEffects } from './reducers/curia-ministries-and-orders.effects';
import { reducer as CuriaFunctionsModalReducer } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { CuriaFunctionsModalEffects } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.effects';
import { reducer as WorshipplacesModalReducer } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { reducer as PriestsV1ModalReducer } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { PriestsV1ModalEffects } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.effects';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';

import { CuriaMinistriesAndOrdersService } from '@peakitpt/ui-kyrios-api';
import { CuriaMinistriesAndOrdersRoutingModule } from './curia-ministries-and-orders-routing.module';
import { CuriaMinistriesAndOrdersListComponent } from './curia-ministries-and-orders-list/curia-ministries-and-orders-list.component';
import { CuriaMinistriesAndOrdersDetailsComponent } from './curia-ministries-and-orders-details/curia-ministries-and-orders-details.component';
import { CuriaMinistriesAndOrdersFormComponent } from './curia-ministries-and-orders-form/curia-ministries-and-orders-form.component';
import { CuriaMinistriesAndOrdersDeleteComponent } from './curia-ministries-and-orders-delete/curia-ministries-and-orders-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CuriaMinistriesAndOrdersSearchComponent } from './curia-ministries-and-orders-search/curia-ministries-and-orders-search.component';
import { ReportsModule } from '../reports/reports.module';
import { CuriaMinistriesAndOrdersFormMainTabComponent } from './curia-ministries-and-orders-form/curia-ministries-and-orders-form-main-tab/curia-ministries-and-orders-form-main-tab.component';
import { CuriaMinistriesAndOrdersFormAttachmentsTabComponent } from './curia-ministries-and-orders-form/curia-ministries-and-orders-form-attachments-tab/curia-ministries-and-orders-form-attachments-tab.component';
import { CuriaMinistriesAndOrdersEmitDocumentsComponent } from './curia-ministries-and-orders-emit-documents/curia-ministries-and-orders-emit-documents.component';

import { reducer as DocumentsTypesModalReducer } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { DocumentsTypesModalEffects } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.effects';
import { reducer as DocumentsReducer } from 'src/app/components/documents/reducers/documents.reducer';
import { DocumentsEffects } from 'src/app/components/documents/reducers/documents.effects';
import { PersonsModule } from '../persons/persons.module';

@NgModule({
  declarations: [
    CuriaMinistriesAndOrdersListComponent,
    CuriaMinistriesAndOrdersDetailsComponent,
    CuriaMinistriesAndOrdersFormComponent,
    CuriaMinistriesAndOrdersDeleteComponent,
    CuriaMinistriesAndOrdersSearchComponent,
    CuriaMinistriesAndOrdersFormMainTabComponent,
    CuriaMinistriesAndOrdersFormAttachmentsTabComponent,
    CuriaMinistriesAndOrdersEmitDocumentsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-ministries-and-orders', reducer),
    EffectsModule.forFeature([CuriaMinistriesAndOrdersEffects]),

    StoreModule.forFeature('curia-functions-modal', CuriaFunctionsModalReducer),
    EffectsModule.forFeature([CuriaFunctionsModalEffects]),
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
    CuriaMinistriesAndOrdersRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // Quick Insertions
    PersonsModule,
  ],
  providers: [
    CuriaMinistriesAndOrdersService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class CuriaMinistriesAndOrdersModule {}
