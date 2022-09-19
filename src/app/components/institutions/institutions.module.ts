import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InstitutionsService } from '@peakitpt/ui-kyrios-api';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { I18NextModule } from 'angular-i18next';
import { ArchpristshipsModalEffects } from 'src/app/shared/components/modals/archpristships-modal/reducers/archpristships-modal.effects';
import { reducer as ArchpristshipsModalReducer } from 'src/app/shared/components/modals/archpristships-modal/reducers/archpristships-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { CountriesModalEffects } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.effects';
import { reducer as CountriesModalReducer } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.reducer';
import { InstitutionsTypesModalEffects } from 'src/app/shared/components/modals/institutions-types-modal/reducers/institutions-types-modal.effects';
import { reducer as InstitutionsTypesModalReducer } from 'src/app/shared/components/modals/institutions-types-modal/reducers/institutions-types-modal.reducer';
import { ValencesModalEffects } from 'src/app/shared/components/modals/valences-modal/reducers/valences-modal.effects';
import { reducer as ValencesModalReducer } from 'src/app/shared/components/modals/valences-modal/reducers/valences-modal.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchpristshipsModule } from '../archpristships/archpristships.module';
import { ChapelriesModule } from '../chapelries/chapelries.module';
import { CountriesModule } from '../countries/countries.module';
import { InstitutionTypesModule } from '../institution-types/institution-types.module';
import { ReportsModule } from '../reports/reports.module';
import { InstitutionsDeleteComponent } from './institutions-delete/institutions-delete.component';
import { InstitutionsDetailsMainTabComponent } from './institutions-details/institutions-details-main-tab/institutions-details-main-tab.component';
import { InstitutionsDetailsNominationsTabComponent } from './institutions-details/institutions-details-nominations-tab/institutions-details-nominations-tab.component';
import { InstitutionsDetailsPermissionsTabComponent } from './institutions-details/institutions-details-permissions-tab/institutions-details-permissions-tab.component';
import { InstitutionsDetailsComponent } from './institutions-details/institutions-details.component';
import { InstitutionsFormMainTabComponent } from './institutions-form/institutions-form-main-tab/institutions-form-main-tab.component';
import { InstitutionsFormNominationsTabComponent } from './institutions-form/institutions-form-nominations-tab/institutions-form-nominations-tab.component';
import { InstitutionsFormPermissionsTabComponent } from './institutions-form/institutions-form-permissions-tab/institutions-form-permissions-tab.component';
import { InstitutionsFormComponent } from './institutions-form/institutions-form.component';
import { InstitutionsListComponent } from './institutions-list/institutions-list.component';
import { InstitutionsRoutingModule } from './institutions-routing.module';
import { InstitutionsSearchComponent } from './institutions-search/institutions-search.component';
import { InstitutionsEffects } from './reducers/institutions.effects';
import { reducer } from './reducers/institutions.reducer';

@NgModule({
  declarations: [
    InstitutionsListComponent,
    InstitutionsSearchComponent,
    InstitutionsDeleteComponent,
    // DETAILS
    InstitutionsDetailsComponent,
    InstitutionsDetailsMainTabComponent,
    InstitutionsDetailsNominationsTabComponent,
    InstitutionsDetailsPermissionsTabComponent,
    // FORM
    InstitutionsFormComponent,
    InstitutionsFormMainTabComponent,
    InstitutionsFormNominationsTabComponent,
    InstitutionsFormPermissionsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('institutions', reducer),
    EffectsModule.forFeature([InstitutionsEffects]),

    StoreModule.forFeature(
      'institutions-types-modal',
      InstitutionsTypesModalReducer
    ),
    EffectsModule.forFeature([InstitutionsTypesModalEffects]),

    StoreModule.forFeature('archpristships-modal', ArchpristshipsModalReducer),
    EffectsModule.forFeature([ArchpristshipsModalEffects]),

    StoreModule.forFeature('chapelry-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),

    StoreModule.forFeature('countries-modal', CountriesModalReducer),
    EffectsModule.forFeature([CountriesModalEffects]),

    StoreModule.forFeature('valences-modal', ValencesModalReducer),
    EffectsModule.forFeature([ValencesModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    InstitutionsRoutingModule,
    ReportsModule,

    // Quick insertions
    InstitutionTypesModule,
    ArchpristshipsModule,
    ChapelriesModule,
    CountriesModule,
  ],
  providers: [
    InstitutionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class InstitutionsModule {}
