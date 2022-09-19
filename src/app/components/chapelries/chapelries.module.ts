import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ChapelriesService } from '@peakitpt/ui-kyrios-api';
import { ChapelriesRoutingModule } from './chapelries-routing.module';
import { reducer } from './reducers/chapelries.reducer';
import { ChapelriesEffects } from './reducers/chapelries.effects';
import { ChapelriesListComponent } from './chapelries-list/chapelries-list.component';
import { ChapelriesFormComponent } from './chapelries-form/chapelries-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { reducer as bishoprics_modal_reducer } from '../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.reducer';
import { BishopricsModalEffects } from '../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.effects';
import { reducer as archpristships_modal_reducer } from '../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.reducer';
import { ArchpristshipsModalEffects } from '../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.effects';
import { reducer as patrons_modal_reducer } from '../../shared/components/modals/patrons-modal/reducers/patrons-modal.reducer';
import { PatronsModalEffects } from '../../shared/components/modals/patrons-modal/reducers/patrons-modal.effects';
import { reducer as worshipplaces_modal_reducer } from '../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from '../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { reducer as base_reducer } from '../base/reducers/base.reducer';
import { SideNavEffects } from '../base/reducers/base.effects';
import { ReportsModule } from '../reports/reports.module';

import { ChapelriesDetailsComponent } from './chapelries-details/chapelries-details.component';
import { ChapelriesDeleteComponent } from './chapelries-delete/chapelries-delete.component';
import { ChapelriesSearchComponent } from './chapelries-search/chapelries-search.component';
import { PatronsModule } from '../patrons/patrons.module';
import { ArchpristshipsModule } from '../archpristships/archpristships.module';
import { WorshipplacesModule } from '../worshipplaces/worshipplaces.module';
import { reducer as worshipplaces_reducer } from '../worshipplaces/reducers/worshipplaces.reducer';
import { WorshipplacesEffects } from '../worshipplaces/reducers/worshipplaces.effects';
import { ArchpristshipsEffects } from '../archpristships/reducers/archpristships.effects';
import { reducer as archpristships_reducer } from '../archpristships/reducers/archpristships.reducer';
import { PatronsEffects } from '../patrons/reducers/patrons.effects';
import { reducer as patrons_reducer } from '../patrons/reducers/patrons.reducer';
import { ChapelriesModalEffects } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as chapelries_modal_reducer } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';

@NgModule({
  declarations: [
    ChapelriesListComponent,
    ChapelriesFormComponent,
    ChapelriesDetailsComponent,
    ChapelriesDeleteComponent,
    ChapelriesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('chapelries', reducer),
    EffectsModule.forFeature([ChapelriesEffects]),
    StoreModule.forFeature('bishoprics-modal', bishoprics_modal_reducer),
    EffectsModule.forFeature([BishopricsModalEffects]),
    StoreModule.forFeature(
      'archpristships-modal',
      archpristships_modal_reducer
    ),
    EffectsModule.forFeature([ArchpristshipsModalEffects]),
    StoreModule.forFeature('patrons-modal', patrons_modal_reducer),
    EffectsModule.forFeature([PatronsModalEffects]),
    StoreModule.forFeature('worshipplaces-modal', worshipplaces_modal_reducer),
    EffectsModule.forFeature([WorshipplacesModalEffects]),
    StoreModule.forFeature('chapelries-modal', chapelries_modal_reducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),
    StoreModule.forFeature('base', base_reducer),
    EffectsModule.forFeature([SideNavEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ChapelriesRoutingModule,
    MatCheckboxModule,
    ReportsModule,

    StoreModule.forFeature('patrons', patrons_reducer),
    EffectsModule.forFeature([PatronsEffects]),
    StoreModule.forFeature('archpristships', archpristships_reducer),
    EffectsModule.forFeature([ArchpristshipsEffects]),
    StoreModule.forFeature('worshipplaces', worshipplaces_reducer),
    EffectsModule.forFeature([WorshipplacesEffects]),
  ],
  providers: [
    ChapelriesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [ChapelriesFormComponent],
})
export class ChapelriesModule {}
