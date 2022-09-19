import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/priests.reducer';
import { PriestsEffects } from './reducers/priests.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { PriestsService } from '@peakitpt/ui-kyrios-api';
import { PriestsRoutingModule } from './priests-routing.module';
import { PriestsListComponent } from './priests-list/priests-list.component';
import { PriestsDetailsComponent } from './priests-details/priests-details.component';
import { PriestsFormComponent } from './priests-form/priests-form.component';
import { PriestsDeleteComponent } from './priests-delete/priests-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { PriestsSearchComponent } from './priests-search/priests-search.component';
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
import { PersonsModule } from '../persons/persons.module';


@NgModule({
  declarations: [
    PriestsListComponent,
    PriestsDetailsComponent,
    PriestsFormComponent,
    PriestsDeleteComponent,
    PriestsSearchComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    StoreModule.forFeature('priests', reducer),
    EffectsModule.forFeature([PriestsEffects]),

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
    PriestsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // PersonsModule,
  ],
  providers: [
    PriestsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class PriestsModule {}
