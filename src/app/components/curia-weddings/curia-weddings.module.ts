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

import { CuriaWeddingsService } from '@peakitpt/ui-kyrios-api';
import { reducer } from './reducers/curia-weddings.reducer';
import { CuriaWeddingsEffects } from './reducers/curia-weddings.effects';
import { CuriaWeddingsRoutingModule } from './curia-weddings-routing.module';
import { CuriaWeddingsListComponent } from './curia-weddings-list/curia-weddings-list.component';
import { CuriaWeddingsSearchComponent } from './curia-weddings-search/curia-weddings-search.component';
import { CuriaWeddingsDeleteComponent } from './curia-weddings-delete/curia-weddings-delete.component';
// DETAILS
import { CuriaWeddingsDetailsComponent } from './curia-weddings-details/curia-weddings-details.component';
import { CuriaWeddingsDetailsWeddingTabComponent } from './curia-weddings-details/curia-weddings-details-wedding-tab/curia-weddings-details-wedding-tab.component';
import { CuriaWeddingsDetailsGroomsTabComponent } from './curia-weddings-details/curia-weddings-details-grooms-tab/curia-weddings-details-grooms-tab.component';
import { CuriaWeddingsDetailsSeatDuplicateTabComponent } from './curia-weddings-details/curia-weddings-details-seat-duplicate-tab/curia-weddings-details-seat-duplicate-tab.component';
import { CuriaWeddingsDetailsMod1TabComponent } from './curia-weddings-details/curia-weddings-details-mod1-tab/curia-weddings-details-mod1-tab.component';
import { CuriaWeddingsDetailsMod2TabComponent } from './curia-weddings-details/curia-weddings-details-mod2-tab/curia-weddings-details-mod2-tab.component';
import { CuriaWeddingsDetailsAttachmentsTabComponent } from './curia-weddings-details/curia-weddings-details-attachments-tab/curia-weddings-details-attachments-tab.component';
// FORM
import { CuriaWeddingsFormComponent } from './curia-weddings-form/curia-weddings-form.component';
import { CuriaWeddingsFormWeddingTabComponent } from './curia-weddings-form/curia-weddings-form-wedding-tab/curia-weddings-form-wedding-tab.component';
import { CuriaWeddingsFormGroomsTabComponent } from './curia-weddings-form/curia-weddings-form-grooms-tab/curia-weddings-form-grooms-tab.component';
import { CuriaWeddingsFormSeatDuplicateTabComponent } from './curia-weddings-form/curia-weddings-form-seat-duplicate-tab/curia-weddings-form-seat-duplicate-tab.component';
import { CuriaWeddingsFormMod1TabComponent } from './curia-weddings-form/curia-weddings-form-mod1-tab/curia-weddings-form-mod1-tab.component';
import { CuriaWeddingsFormMod2TabComponent } from './curia-weddings-form/curia-weddings-form-mod2-tab/curia-weddings-form-mod2-tab.component';
import { CuriaWeddingsFormAttachmentsTabComponent } from './curia-weddings-form/curia-weddings-form-attachments-tab/curia-weddings-form-attachments-tab.component';

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
import { CuriaWeddingsEmitDocumentsComponent } from './curia-weddings-emit-documents/curia-weddings-emit-documents.component';

@NgModule({
  declarations: [
    CuriaWeddingsListComponent,
    CuriaWeddingsSearchComponent,
    CuriaWeddingsDeleteComponent,
    // DETAILS
    CuriaWeddingsDetailsComponent,
    CuriaWeddingsDetailsWeddingTabComponent,
    CuriaWeddingsDetailsGroomsTabComponent,
    CuriaWeddingsDetailsSeatDuplicateTabComponent,
    CuriaWeddingsDetailsMod1TabComponent,
    CuriaWeddingsDetailsMod2TabComponent,
    CuriaWeddingsDetailsAttachmentsTabComponent,
    CuriaWeddingsEmitDocumentsComponent,
    // FORM
    CuriaWeddingsFormComponent,
    CuriaWeddingsFormWeddingTabComponent,
    CuriaWeddingsFormGroomsTabComponent,
    CuriaWeddingsFormSeatDuplicateTabComponent,
    CuriaWeddingsFormMod1TabComponent,
    CuriaWeddingsFormMod2TabComponent,
    CuriaWeddingsFormAttachmentsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-weddings', reducer),
    EffectsModule.forFeature([CuriaWeddingsEffects]),

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
    CuriaWeddingsRoutingModule,
    ReportsModule,

    // Quick insertions
    PersonsModule,
    EmolumentsModule,
    WorshipplacesModule,
    ChapelriesModule,
  ],
  providers: [
    CuriaWeddingsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class CuriaWeddingsModule {}
