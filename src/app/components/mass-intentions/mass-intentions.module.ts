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

import { MassIntentionsService } from '@peakitpt/ui-kyrios-api';
import { MassIntentionsRoutingModule } from './mass-intentions-routing.module';
import { MassIntentionsListComponent } from './mass-intentions-list/mass-intentions-list.component';
import { MassIntentionsSearchComponent } from './mass-intentions-search/mass-intentions-search.component';
import { MassIntentionsDeleteComponent } from './mass-intentions-delete/mass-intentions-delete.component';
import { MassIntentionsDetailsComponent } from './mass-intentions-details/mass-intentions-details.component';
import { MassIntentionsFormComponent } from './mass-intentions-form/mass-intentions-form.component';

import { reducer } from './reducers/mass-intentions.reducer';
import { MassIntentionsEffects } from './reducers/mass-intentions.effects';
import { reducer as PriestsAndPersonsModalReducer } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.reducer';
import { PriestsAndPersonsModalEffects } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.effects';
import { reducer as WorshipplacesModalReducer } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';

// Quick Insertion
import { MassIntentionsTypesModule } from '../mass-intentions-types/mass-intentions-types.module';
import { WorshipplacesModule } from '../worshipplaces/worshipplaces.module';
import { EmolumentsModule } from '../emoluments/emoluments.module';

@NgModule({
  declarations: [
    MassIntentionsListComponent,
    MassIntentionsFormComponent,
    MassIntentionsDetailsComponent,
    MassIntentionsDeleteComponent,
    MassIntentionsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('mass-intentions', reducer),
    EffectsModule.forFeature([MassIntentionsEffects]),

    StoreModule.forFeature(
      'priests-and-persons-modal',
      PriestsAndPersonsModalReducer
    ),
    EffectsModule.forFeature([PriestsAndPersonsModalEffects]),

    StoreModule.forFeature('worshipplaces-modal', WorshipplacesModalReducer),
    EffectsModule.forFeature([WorshipplacesModalEffects]),

    StoreModule.forFeature('emoluments-modal', EmolumentsModalReducer),
    EffectsModule.forFeature([EmolumentsModalEffects]),

    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    MassIntentionsRoutingModule,
    ReportsModule,
    MassIntentionsTypesModule,

    // Quick Insertions
    WorshipplacesModule,
    EmolumentsModule,
  ],
  providers: [
    MassIntentionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class MassIntentionsModule {}
