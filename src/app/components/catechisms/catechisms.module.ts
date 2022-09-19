import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportsModule } from '../reports/reports.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  CatechismsService,
  CatechismsSessionsService,
  CatechismsIndividualDocumentsService,
} from '@peakitpt/ui-kyrios-api';
import { CatechismsRoutingModule } from './catechisms-routing.module';
import { reducer } from './reducers/catechisms.reducer';
import { CatechismsEffects } from './reducers/catechisms.effects';
import { CatechismsListComponent } from './catechisms-list/catechisms-list.component';
import { CatechismsSearchComponent } from './catechisms-search/catechisms-search.component';
import { CatechismsDeleteComponent } from './catechisms-delete/catechisms-delete.component';
import { CatechismsFormComponent } from './catechisms-form/catechisms-form.component';
import { CatechismsFormCatechismTabComponent } from './catechisms-form/catechisms-form-catechism-tab/catechisms-form-catechism-tab.component';
import { CatechismsFormTransfersTabComponent } from './catechisms-form/catechisms-form-transfers-tab/catechisms-form-transfers-tab.component';
import { CatechismsDetailsComponent } from './catechisms-details/catechisms-details.component';
import { CatechismsDetailsCatechismTabComponent } from './catechisms-details/catechisms-details-catechism-tab/catechisms-details-catechism-tab.component';
import { CatechismsDetailsSessionsTabComponent } from './catechisms-details/catechisms-details-sessions-tab/catechisms-details-sessions-tab.component';
import { CatechismsDetailsTransfersTabComponent } from './catechisms-details/catechisms-details-transfers-tab/catechisms-details-transfers-tab.component';
import { CatechismsDetailsIndividualDocumentsTabComponent } from './catechisms-details/catechisms-details-individual-documents-tab/catechisms-details-individual-documents-tab.component';

import { reducer as PersonsModalReducer } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { PersonsModalEffects } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.effects';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';

// SESSIONS
import { CatechismsSessionsListComponent } from './catechisms-details/catechisms-details-sessions-tab/catechisms-sessions/catechisms-sessions-list/catechisms-sessions-list.component';
import { CatechismsSessionsDetailsComponent } from './catechisms-details/catechisms-details-sessions-tab/catechisms-sessions/catechisms-sessions-details/catechisms-sessions-details.component';
import { CatechismsSessionsFormComponent } from './catechisms-details/catechisms-details-sessions-tab/catechisms-sessions/catechisms-sessions-form/catechisms-sessions-form.component';
import { CatechismsSessionsDeleteComponent } from './catechisms-details/catechisms-details-sessions-tab/catechisms-sessions/catechisms-sessions-delete/catechisms-sessions-delete.component';

// Quick Insertion
import { PersonsModule } from '../persons/persons.module';
import { ChapelriesModule } from '../chapelries/chapelries.module';
import { CatechismsConfirmationModalComponent } from './catechisms-confirmation-modal/catechisms-confirmation-modal.component';

@NgModule({
  declarations: [
    CatechismsListComponent,
    CatechismsSearchComponent,
    CatechismsDeleteComponent,
    CatechismsFormComponent,
    CatechismsDetailsComponent,
    // FORM
    CatechismsFormCatechismTabComponent,
    CatechismsFormTransfersTabComponent,
    // DETAILS
    CatechismsDetailsCatechismTabComponent,
    CatechismsDetailsSessionsTabComponent,
    CatechismsDetailsTransfersTabComponent,
    CatechismsDetailsIndividualDocumentsTabComponent,
    CatechismsConfirmationModalComponent,
    // SESSIONS
    CatechismsSessionsListComponent,
    CatechismsSessionsDetailsComponent,
    CatechismsSessionsFormComponent,
    CatechismsSessionsDeleteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('catechisms', reducer),
    EffectsModule.forFeature([CatechismsEffects]),

    StoreModule.forFeature('persons-modal', PersonsModalReducer),
    EffectsModule.forFeature([PersonsModalEffects]),

    StoreModule.forFeature('chapelries-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    CatechismsRoutingModule,
    ReportsModule,

    // Quick Insertions
    PersonsModule,
    ChapelriesModule,
  ],
  providers: [
    CatechismsService,
    CatechismsSessionsService,
    CatechismsIndividualDocumentsService,
  ],
})
export class CatechismsModule {}
