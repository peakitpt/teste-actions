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

import { BaptismsService } from '@peakitpt/ui-kyrios-api';
import { reducer } from './reducers/baptisms.reducer';
import { BaptismsEffects } from './reducers/baptisms.effects';
import { BaptismsRoutingModule } from './baptisms-routing.module';
import { BaptismsListComponent } from './baptisms-list/baptisms-list.component';
import { BaptismsSearchComponent } from './baptisms-search/baptisms-search.component';
import { BaptismsDeleteComponent } from './baptisms-delete/baptisms-delete.component';
import { BaptismsDetailsComponent } from './baptisms-details/baptisms-details.component';
import { BaptismsDetailsMainTabComponent } from './baptisms-details/baptisms-details-main-tab/baptisms-details-main-tab.component';
import { BaptismsDetailsParentsTabComponent } from './baptisms-details/baptisms-details-parents-tab/baptisms-details-parents-tab.component';
import { BaptismsDetailsGodparentsTabComponent } from './baptisms-details/baptisms-details-godparents-tab/baptisms-details-godparents-tab.component';
import { BaptismsDetailsAttachmentsTabComponent } from './baptisms-details/baptisms-details-attachments-tab/baptisms-details-attachments-tab.component';
import { BaptismsFormComponent } from './baptisms-form/baptisms-form.component';
import { BaptismsFormMainTabComponent } from './baptisms-form/baptisms-form-main-tab/baptisms-form-main-tab.component';
import { BaptismsFormParentsGrandparentsTabComponent } from './baptisms-form/baptisms-form-parents-grandparents-tab/baptisms-form-parents-grandparents-tab.component';
import { BaptismsFormGodparentsTabComponent } from './baptisms-form/baptisms-form-godparents-tab/baptisms-form-godparents-tab.component';
import { BaptismsFormReportsTabComponent } from './baptisms-form/baptisms-form-reports-tab/baptisms-form-reports-tab.component';
import { BaptismsFormAttachmentsTabComponent } from './baptisms-form/baptisms-form-attachments-tab/baptisms-form-attachments-tab.component';

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

@NgModule({
  declarations: [
    BaptismsListComponent,
    BaptismsSearchComponent,
    BaptismsDeleteComponent,
    // DETAILS
    BaptismsDetailsComponent,
    BaptismsDetailsMainTabComponent,
    BaptismsDetailsParentsTabComponent,
    BaptismsDetailsGodparentsTabComponent,
    BaptismsDetailsAttachmentsTabComponent,
    // FORM
    BaptismsFormComponent,
    BaptismsFormMainTabComponent,
    BaptismsFormParentsGrandparentsTabComponent,
    BaptismsFormGodparentsTabComponent,
    BaptismsFormReportsTabComponent,
    BaptismsFormAttachmentsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('baptisms', reducer),
    EffectsModule.forFeature([BaptismsEffects]),

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

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    BaptismsRoutingModule,
    ReportsModule,

    // Quick insertions
    PersonsModule,
    EmolumentsModule,
    WorshipplacesModule,
    ChapelriesModule,
  ],
  providers: [
    BaptismsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class BaptismsModule {}
