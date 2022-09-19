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
import { AcolytesService } from '@peakitpt/ui-kyrios-api';
import { AcolytesRoutingModule } from './acolytes-routing.module';
import { reducer } from './reducers/acolytes.reducer';
import { AcolytesEffects } from './reducers/acolytes.effects';
import { reducer as formations_modal_reducer } from '../../shared/components/modals/formations-modal/reducers/formations-modal.reducer';
import { FormationsModalEffects } from '../../shared/components/modals/formations-modal/reducers/formations-modal.effects';
import { reducer as chapelries_modal_reducer } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as worshipplaces_modal_reducer } from '../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from '../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { AcolytesListComponent } from './acolytes-list/acolytes-list.component';
import { AcolytesFormComponent } from './acolytes-form/acolytes-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AcolytesDetailsComponent } from './acolytes-details/acolytes-details.component';
import { AcolytesDeleteComponent } from './acolytes-delete/acolytes-delete.component';
import { AcolytesSearchComponent } from './acolytes-search/acolytes-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    AcolytesListComponent,
    AcolytesFormComponent,
    AcolytesDetailsComponent,
    AcolytesDeleteComponent,
    AcolytesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('acolytes', reducer),
    EffectsModule.forFeature([AcolytesEffects]),
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
    AcolytesRoutingModule,
    MatCheckboxModule,
    ReportsModule,
  ],
  providers: [
    AcolytesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class AcolytesModule {}
