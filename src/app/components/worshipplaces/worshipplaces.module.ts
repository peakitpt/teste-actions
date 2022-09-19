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
import { WorshipplacesService } from '@peakitpt/ui-kyrios-api';
import { WorshipplacesRoutingModule } from './worshipplaces-routing.module';
import { reducer } from './reducers/worshipplaces.reducer';
import { WorshipplacesEffects } from './reducers/worshipplaces.effects';
import { WorshipplacesListComponent } from './worshipplaces-list/worshipplaces-list.component';
import { WorshipplacesFormComponent } from './worshipplaces-form/worshipplaces-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportsModule } from '../reports/reports.module';

import { reducer as bishoprics_modal_reducer } from '../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.reducer';
import { reducer as chapelries_modal_reducer } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { reducer as archpristships_modal_reducer } from '../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.reducer';
import { BishopricsModalEffects } from '../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.effects';
import { ChapelriesModalEffects } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { ArchpristshipsModalEffects } from '../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.effects';
import { WorshipplacesDetailsComponent } from './worshipplaces-details/worshipplaces-details.component';
import { WorshipplacesDeleteComponent } from './worshipplaces-delete/worshipplaces-delete.component';
import { WorshipplacesSearchComponent } from './worshipplaces-search/worshipplaces-search.component';
import { ChapelriesModule } from '../chapelries/chapelries.module';

@NgModule({
  declarations: [
    WorshipplacesListComponent,
    WorshipplacesFormComponent,
    WorshipplacesDetailsComponent,
    WorshipplacesDeleteComponent,
    WorshipplacesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('worshipplaces', reducer),
    EffectsModule.forFeature([WorshipplacesEffects]),
    StoreModule.forFeature('bishoprics-modal', bishoprics_modal_reducer),
    EffectsModule.forFeature([BishopricsModalEffects]),
    StoreModule.forFeature('chapelries-modal', chapelries_modal_reducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),
    StoreModule.forFeature(
      'archpristships-modal',
      archpristships_modal_reducer
    ),
    EffectsModule.forFeature([ArchpristshipsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    WorshipplacesRoutingModule,
    MatCheckboxModule,
    ReportsModule,
    ChapelriesModule,
  ],
  providers: [
    WorshipplacesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [WorshipplacesFormComponent],
})
export class WorshipplacesModule {}
