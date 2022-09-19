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

import { CatechumensService } from '@peakitpt/ui-kyrios-api';
import { reducer } from './reducers/catechumens.reducer';
import { CatechumensEffects } from './reducers/catechumens.effects';
import { CatechumensRoutingModule } from './catechumens-routing.module';
import { CatechumensListComponent } from './catechumens-list/catechumens-list.component';
import { CatechumensSearchComponent } from './catechumens-search/catechumens-search.component';
import { CatechumensDeleteComponent } from './catechumens-delete/catechumens-delete.component';
import { CatechumensDetailsComponent } from './catechumens-details/catechumens-details.component';
import { CatechumensFormComponent } from './catechumens-form/catechumens-form.component';

import { PersonsModule } from '../persons/persons.module';
import { reducer as PersonsModalReducer } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { PersonsModalEffects } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.effects';
import { reducer as PriestsModalReducer } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.reducer';
import { PriestsModalEffects } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.effects';
import { WorshipplacesModule } from '../worshipplaces/worshipplaces.module';
import { reducer as WorshipplacesModalReducer } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { reducer as EmolumentsModalReducer } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { EmolumentsModalEffects } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.effects';
import { EmolumentsModule } from '../emoluments/emoluments.module';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';

@NgModule({
  declarations: [
    CatechumensListComponent,
    CatechumensSearchComponent,
    CatechumensDeleteComponent,
    CatechumensDetailsComponent,
    CatechumensFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('catechumens', reducer),
    EffectsModule.forFeature([CatechumensEffects]),

    StoreModule.forFeature('persons-modal', PersonsModalReducer),
    EffectsModule.forFeature([PersonsModalEffects]),

    StoreModule.forFeature('priests-modal', PriestsModalReducer),
    EffectsModule.forFeature([PriestsModalEffects]),

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
    CatechumensRoutingModule,
    ReportsModule,

    // Quick insertions
    PersonsModule,
    WorshipplacesModule,
    EmolumentsModule,
  ],
  providers: [
    CatechumensService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class CatechumensModule {}
