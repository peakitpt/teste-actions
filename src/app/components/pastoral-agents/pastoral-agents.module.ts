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
import { PastoralAgentsService } from '@peakitpt/ui-kyrios-api';
import { PastoralAgentsRoutingModule } from './pastoral-agents-routing.module';
import { reducer } from './reducers/pastoral-agents.reducer';
import { PastoralAgentsEffects } from './reducers/pastoral-agents.effects';
import { reducer as formations_modal_reducer } from '../../shared/components/modals/formations-modal/reducers/formations-modal.reducer';
import { FormationsModalEffects } from '../../shared/components/modals/formations-modal/reducers/formations-modal.effects';
import { reducer as chapelries_modal_reducer } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as pastoral_agents_type_modal_reducer } from '../../shared/components/modals/pastoral-agents-types-modal/reducers/pastoral-agents-types-modal.reducer';
import { PastoralAgentsTypesModalEffects } from '../../shared/components/modals/pastoral-agents-types-modal/reducers/pastoral-agents-types-modal.effects';
import { PastoralAgentsListComponent } from '../pastoral-agents/pastoral-agents-list/pastoral-agents-list.component';
import { PastoralAgentsFormComponent } from '../pastoral-agents/pastoral-agents-form/pastoral-agents-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PastoralAgentsDetailsComponent } from '../pastoral-agents/pastoral-agents-details/pastoral-agents-details.component';
import { PastoralAgentsDeleteComponent } from '../pastoral-agents/pastoral-agents-delete/pastoral-agents-delete.component';
import { PastoralAgentsSearchComponent } from '../pastoral-agents/pastoral-agents-search/pastoral-agents-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    PastoralAgentsListComponent,
    PastoralAgentsFormComponent,
    PastoralAgentsDetailsComponent,
    PastoralAgentsDeleteComponent,
    PastoralAgentsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('pastoral-agent', reducer),
    EffectsModule.forFeature([PastoralAgentsEffects]),
    StoreModule.forFeature('formations-modal', formations_modal_reducer),
    EffectsModule.forFeature([FormationsModalEffects]),
    StoreModule.forFeature('chapelries-modal', chapelries_modal_reducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),
    StoreModule.forFeature(
      'pastoral-agents-type-modal',
      pastoral_agents_type_modal_reducer
    ),
    EffectsModule.forFeature([PastoralAgentsTypesModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    PastoralAgentsRoutingModule,
    MatCheckboxModule,
    ReportsModule,
  ],
  providers: [
    PastoralAgentsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class PastoralAgentsModule {}
