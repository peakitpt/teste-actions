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

import { reducer } from './reducers/persons.reducer';
import {
  NewsletterGroupSubscriptionsService,
  PersonsService,
} from '@peakitpt/ui-kyrios-api';
import { PersonsEffects } from './reducers/persons.effects';
import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonsFormComponent } from './persons-form/persons-form.component';
import { PersonsDetailsComponent } from './persons-details/persons-details.component';
import { PersonsDeleteComponent } from './persons-delete/persons-delete.component';
import { PersonsSearchComponent } from './persons-search/persons-search.component';
import { reducer as CountriesModalReducer } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.reducer';
import { CountriesModalEffects } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.effects';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as WorshipplacesModalReducer } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { reducer as CuriaFunctionsModalReducer } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { CuriaFunctionsModalEffects } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.effects';
import { reducer as PlacesModalReducer } from 'src/app/shared/components/modals/places-modal/reducers/places-modal.reducer';
import { PlacesModalEffects } from 'src/app/shared/components/modals/places-modal/reducers/places-modal.effects';
import { reducer as PersonsModalReducer } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { PersonsModalEffects } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.effects';
import { reducer as PriestsModalReducer } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.reducer';
import { PriestsModalEffects } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.effects';
import { PersonsFormPersonalDataTabComponent } from './persons-form/persons-form-personal-data-tab/persons-form-personal-data-tab.component';
import { PersonsFormCategoriesTabComponent } from './persons-form/persons-form-categories-tab/persons-form-categories-tab.component';
import { PersonsFormProfessionalLifeTabComponent } from './persons-form/persons-form-professional-life-tab/persons-form-professional-life-tab.component';
import { PersonsFormCatechistTabComponent } from './persons-form/persons-form-catechist-tab/persons-form-catechist-tab.component';
import { PersonsFormElderSickTabComponent } from './persons-form/persons-form-elder-sick-tab/persons-form-elder-sick-tab.component';
import { PersonsFormReportsTabComponent } from './persons-form/persons-form-reports-tab/persons-form-reports-tab.component';
import { PersonsFormMecTabComponent } from './persons-form/persons-form-mec-tab/persons-form-mec-tab.component';
import { PersonsFormChristianLifeTabComponent } from './persons-form/persons-form-christian-life-tab/persons-form-christian-life-tab.component';
import { PersonsFormCuriaTabComponent } from './persons-form/persons-form-curia-tab/persons-form-curia-tab.component';
import { PersonsDetailsPersonalDataTabComponent } from './persons-details/persons-details-personal-data-tab/persons-details-personal-data-tab.component';
import { PersonsDetailsCategoriesTabComponent } from './persons-details/persons-details-categories-tab/persons-details-categories-tab.component';
import { PersonsDetailsProfessionalLifeTabComponent } from './persons-details/persons-details-professional-life-tab/persons-details-professional-life-tab.component';
import { PersonsDetailsCatechistTabComponent } from './persons-details/persons-details-catechist-tab/persons-details-catechist-tab.component';
import { PersonsDetailsElderSickTabComponent } from './persons-details/persons-details-elder-sick-tab/persons-details-elder-sick-tab.component';
import { PersonsDetailsReportsTabComponent } from './persons-details/persons-details-reports-tab/persons-details-reports-tab.component';
import { PersonsDetailsMecTabComponent } from './persons-details/persons-details-mec-tab/persons-details-mec-tab.component';
import { PersonsDetailsChristianLifeTabComponent } from './persons-details/persons-details-christian-life-tab/persons-details-christian-life-tab.component';
import { PersonsDetailsCuriaTabComponent } from './persons-details/persons-details-curia-tab/persons-details-curia-tab.component';
import { PersonsFormGroupsTabComponent } from './persons-form/persons-form-groups-tab/persons-form-groups-tab.component';
import { reducer as NewsletterGroupSubscriptionsReducer } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.reducer';
import { NewsletterGroupSubscriptionsEffects } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.effects';
import { PersonsFormGroupsTabToggleComponent } from './persons-form/persons-form-groups-tab/persons-form-groups-tab-toggle/persons-form-groups-tab-toggle.component';
import { PersonsDetailsGroupsTabComponent } from './persons-details/persons-details-groups-tab/persons-details-groups-tab.component';
import { reducer as FamiliesReducer } from 'src/app/components/families/reducers/families.reducer';
import { FamiliesEffects } from 'src/app/components/families/reducers/families.effects';
import { reducer as GroupsReducer } from 'src/app/components/groups/reducers/groups.reducer';
import { GroupsEffects } from '../groups/reducers/groups.effects';

// Quick Insertion
import { CountriesModule } from '../countries/countries.module';
import { ChapelriesModule } from '../chapelries/chapelries.module';
import { WorshipplacesModule } from '../worshipplaces/worshipplaces.module';

@NgModule({
  declarations: [
    PersonsListComponent,
    PersonsFormComponent,
    PersonsDetailsComponent,
    PersonsDeleteComponent,
    PersonsSearchComponent,
    // FORM
    PersonsFormPersonalDataTabComponent,
    PersonsFormCategoriesTabComponent,
    PersonsFormProfessionalLifeTabComponent,
    PersonsFormCatechistTabComponent,
    PersonsFormElderSickTabComponent,
    PersonsFormReportsTabComponent,
    PersonsFormMecTabComponent,
    PersonsFormChristianLifeTabComponent,
    PersonsFormCuriaTabComponent,
    PersonsFormGroupsTabComponent,
    PersonsFormGroupsTabToggleComponent,
    // DETAILS
    PersonsDetailsPersonalDataTabComponent,
    PersonsDetailsCategoriesTabComponent,
    PersonsDetailsProfessionalLifeTabComponent,
    PersonsDetailsCatechistTabComponent,
    PersonsDetailsElderSickTabComponent,
    PersonsDetailsReportsTabComponent,
    PersonsDetailsMecTabComponent,
    PersonsDetailsChristianLifeTabComponent,
    PersonsDetailsCuriaTabComponent,
    PersonsDetailsGroupsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('persons', reducer),
    EffectsModule.forFeature([PersonsEffects]),

    StoreModule.forFeature('countries-modal', CountriesModalReducer),
    EffectsModule.forFeature([CountriesModalEffects]),

    StoreModule.forFeature('chapelries-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),

    StoreModule.forFeature('worshipplaces-modal', WorshipplacesModalReducer),
    EffectsModule.forFeature([WorshipplacesModalEffects]),

    StoreModule.forFeature('curia-functions-modal', CuriaFunctionsModalReducer),
    EffectsModule.forFeature([CuriaFunctionsModalEffects]),

    StoreModule.forFeature('places-modal', PlacesModalReducer),
    EffectsModule.forFeature([PlacesModalEffects]),

    StoreModule.forFeature('persons-modal', PersonsModalReducer),
    EffectsModule.forFeature([PersonsModalEffects]),

    StoreModule.forFeature('priests-modal', PriestsModalReducer),
    EffectsModule.forFeature([PriestsModalEffects]),

    StoreModule.forFeature(
      'newsletter-group-subscriptions',
      NewsletterGroupSubscriptionsReducer
    ),
    EffectsModule.forFeature([NewsletterGroupSubscriptionsEffects]),

    StoreModule.forFeature('families', FamiliesReducer),
    EffectsModule.forFeature([FamiliesEffects]),

    StoreModule.forFeature('groups', GroupsReducer),
    EffectsModule.forFeature([GroupsEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    PersonsRoutingModule,
    ReportsModule,

    // Quick Insertions
    CountriesModule,
    ChapelriesModule,
    WorshipplacesModule,
  ],
  providers: [
    PersonsService,
    NewsletterGroupSubscriptionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [PersonsFormComponent],
})
export class PersonsModule {}
