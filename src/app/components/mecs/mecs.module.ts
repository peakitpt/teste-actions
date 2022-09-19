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
import { MecsService } from '@peakitpt/ui-kyrios-api';
import { MecsRoutingModule } from './mecs-routing.module';
import { reducer } from './reducers/mecs.reducer';
import { MecsEffects } from './reducers/mecs.effects';
import { reducer as formations_modal_reducer } from '../../shared/components/modals/formations-modal/reducers/formations-modal.reducer';
import { FormationsModalEffects } from '../../shared/components/modals/formations-modal/reducers/formations-modal.effects';
import { reducer as chapelries_modal_reducer } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as worshipplaces_modal_reducer } from '../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from '../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { MecsListComponent } from './mecs-list/mecs-list.component';
import { MecsFormComponent } from './mecs-form/mecs-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MecsDetailsComponent } from './mecs-details/mecs-details.component';
import { MecsDeleteComponent } from './mecs-delete/mecs-delete.component';
import { MecsSearchComponent } from './mecs-search/mecs-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    MecsListComponent,
    MecsFormComponent,
    MecsDetailsComponent,
    MecsDeleteComponent,
    MecsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('mecs', reducer),
    EffectsModule.forFeature([MecsEffects]),
    StoreModule.forFeature('formations-modal', formations_modal_reducer),
    EffectsModule.forFeature([FormationsModalEffects]),
    StoreModule.forFeature('chapelries-modal', chapelries_modal_reducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),
    StoreModule.forFeature('worshipplaces-modal', worshipplaces_modal_reducer),
    EffectsModule.forFeature([WorshipplacesModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MecsRoutingModule,
    MatCheckboxModule,
    ReportsModule,
  ],
  providers: [
    MecsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class MecsModule {}
