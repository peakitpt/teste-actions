import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/profile-priests.reducer';
import { ProfilePriestsEffects } from './reducers/profile-priests.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { ReportsModule } from '../reports/reports.module';

import { ProfilePriestsService } from '@peakitpt/ui-kyrios-api';
import { ProfilePriestsRoutingModule } from './profile-priests-routing.module';
import { ProfilePriestsFormComponent } from './profile-priests-form/profile-priests-form.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { reducer as CountriesModalReducer } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.reducer';
import { CountriesModalEffects } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.effects';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as PersonsModalReducer } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { PersonsModalEffects } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.effects';
import { reducer as CuriaFunctionsModalReducer } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { CuriaFunctionsModalEffects } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.effects';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { reducer as ClergyTypesModalReducer } from 'src/app/shared/components/modals/clergy-types-modal/reducers/clergy-types-modal.reducer';
import { ClergyTypesModalEffects } from 'src/app/shared/components/modals/clergy-types-modal/reducers/clergy-types-modal.effects';
import { reducer as PersonsReducer } from '../persons/reducers/persons.reducer';
import { PersonsEffects } from '../persons/reducers/persons.effects';
import { reducer as WorshipplacesModalReducer } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { reducer as PriestsModalReducer } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.reducer';
import { PriestsModalEffects } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.effects';
import { reducer as PlacesModalReducer } from 'src/app/shared/components/modals/places-modal/reducers/places-modal.reducer';
import { PlacesModalEffects } from 'src/app/shared/components/modals/places-modal/reducers/places-modal.effects';
import { ProfilePriestsDetailsComponent } from './profile-priests-details/profile-priests-details.component';

@NgModule({
  declarations: [ProfilePriestsDetailsComponent, ProfilePriestsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    StoreModule.forFeature('profile-priests', reducer),
    EffectsModule.forFeature([ProfilePriestsEffects]),

    StoreModule.forFeature('persons', PersonsReducer),
    EffectsModule.forFeature([PersonsEffects]),

    StoreModule.forFeature('countries-modal', CountriesModalReducer),
    EffectsModule.forFeature([CountriesModalEffects]),

    StoreModule.forFeature('chapelries-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),

    StoreModule.forFeature('persons-modal', PersonsModalReducer),
    EffectsModule.forFeature([PersonsModalEffects]),

    StoreModule.forFeature('curia-functions-modal', CuriaFunctionsModalReducer),
    EffectsModule.forFeature([CuriaFunctionsModalEffects]),

    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),

    StoreModule.forFeature('clergy-types-modal', ClergyTypesModalReducer),
    EffectsModule.forFeature([ClergyTypesModalEffects]),

    StoreModule.forFeature('worshipplaces-modal', WorshipplacesModalReducer),
    EffectsModule.forFeature([WorshipplacesModalEffects]),

    StoreModule.forFeature('priests-modal', PriestsModalReducer),
    EffectsModule.forFeature([PriestsModalEffects]),

    StoreModule.forFeature('places-modal', PlacesModalReducer),
    EffectsModule.forFeature([PlacesModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ProfilePriestsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // PersonsModule,
  ],
  providers: [
    ProfilePriestsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class ProfilePriestsModule {}
