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

import { reducer as PersonsModalReducer } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { PersonsModalEffects } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.effects';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as DocumentsReducer } from 'src/app/components/documents/reducers/documents.reducer';
import { DocumentsEffects } from 'src/app/components/documents/reducers/documents.effects';
import { reducer as RelationshipDegreesReducer } from 'src/app/components/relationship-degrees/reducers/relationship-degrees.reducer';
import { RelationshipDegreesEffects } from 'src/app/components/relationship-degrees/reducers/relationship-degrees.effects';
import { reducer } from './reducers/families.reducer';
import { FamiliesV1Service } from '@peakitpt/ui-kyrios-api';
import { FamiliesEffects } from './reducers/families.effects';
import { FamiliesRoutingModule } from './families-routing.module';
import { FamiliesListComponent } from './families-list/families-list.component';
import { FamiliesDetailsComponent } from './families-details/families-details.component';
import { FamiliesFormComponent } from './families-form/families-form.component';
import { FamiliesDeleteComponent } from './families-delete/families-delete.component';
import { FamiliesSearchComponent } from './families-search/families-search.component';
import { FamiliesDocumentsTabComponent } from './families-documents-tab/families-documents-tab.component';

// Quick Insertion
import { ChapelriesModule } from '../chapelries/chapelries.module';
import { PersonsModule } from '../persons/persons.module';

@NgModule({
  declarations: [
    FamiliesListComponent,
    FamiliesFormComponent,
    FamiliesDetailsComponent,
    FamiliesDeleteComponent,
    FamiliesSearchComponent,
    FamiliesDocumentsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('families', reducer),
    EffectsModule.forFeature([FamiliesEffects]),

    StoreModule.forFeature('persons-modal', PersonsModalReducer),
    EffectsModule.forFeature([PersonsModalEffects]),

    StoreModule.forFeature('chapelries-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),

    StoreModule.forFeature('documents', DocumentsReducer),
    EffectsModule.forFeature([DocumentsEffects]),

    StoreModule.forFeature('relationship-degrees', RelationshipDegreesReducer),
    EffectsModule.forFeature([RelationshipDegreesEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    FamiliesRoutingModule,
    ReportsModule,

    // Quick Insertions
    ChapelriesModule,
    PersonsModule,
  ],
  providers: [
    FamiliesV1Service,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class FamiliesModule {}
