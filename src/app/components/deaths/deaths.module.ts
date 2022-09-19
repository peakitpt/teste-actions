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

import { reducer } from './reducers/deaths.reducer';
import { DeathsService } from '@peakitpt/ui-kyrios-api';
import { DeathsEffects } from './reducers/deaths.effects';
import { DeathsRoutingModule } from './deaths-routing.module';
import { DeathsListComponent } from './deaths-list/deaths-list.component';
import { DeathsSearchComponent } from './deaths-search/deaths-search.component';
import { DeathsDeleteComponent } from './deaths-delete/deaths-delete.component';
import { DeathsDetailsComponent } from './deaths-details/deaths-details.component';
import { DeathsFormComponent } from './deaths-form/deaths-form.component';
import { DeathsFormMainTabComponent } from './deaths-form/deaths-form-main-tab/deaths-form-main-tab.component';
import { DeathsFormReportsTabComponent } from './deaths-form/deaths-form-reports-tab/deaths-form-reports-tab.component';

import { PersonsModule } from '../persons/persons.module';
import { reducer as PersonsModalReducer } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { PersonsModalEffects } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.effects';
import { ChapelriesModule } from '../chapelries/chapelries.module';
import { reducer as ChapelriesModalReducer } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';
import { EmolumentsModule } from '../emoluments/emoluments.module';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';

@NgModule({
  declarations: [
    DeathsListComponent,
    DeathsFormComponent,
    DeathsDetailsComponent,
    DeathsDeleteComponent,
    DeathsSearchComponent,
    // FORM
    DeathsFormMainTabComponent,
    DeathsFormReportsTabComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('deaths', reducer),
    EffectsModule.forFeature([DeathsEffects]),

    StoreModule.forFeature('persons-modal', PersonsModalReducer),
    EffectsModule.forFeature([PersonsModalEffects]),

    StoreModule.forFeature('chapelries-modal', ChapelriesModalReducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),

    StoreModule.forFeature('emoluments-modal', EmolumentsModalReducer),
    EffectsModule.forFeature([EmolumentsModalEffects]),

    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    DeathsRoutingModule,
    ReportsModule,

    // Quick insertions
    PersonsModule,
    ChapelriesModule,
    EmolumentsModule,
  ],
  providers: [
    DeathsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class DeathsModule {}
