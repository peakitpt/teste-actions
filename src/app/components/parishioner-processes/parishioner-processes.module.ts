import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/parishioner-processes.reducer';
import { ParishionerProcessesEffects } from './reducers/parishioner-processes.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { ParishionerProcessesService } from '@peakitpt/ui-kyrios-api';
import { ParishionerProcessesRoutingModule } from './parishioner-processes-routing.module';
import { ParishionerProcessesListComponent } from './parishioner-processes-list/parishioner-processes-list.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ParishionerProcessesSearchComponent } from './parishioner-processes-search/parishioner-processes-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as ViewsModalReducer } from 'src/app/shared/components/modals/views-modal/reducers/views-modal.reducer';
import { ViewsModalEffects } from 'src/app/shared/components/modals/views-modal/reducers/views-modal.effects';

@NgModule({
  declarations: [
    ParishionerProcessesListComponent,
    ParishionerProcessesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('parishioner-processes', reducer),
    EffectsModule.forFeature([ParishionerProcessesEffects]),
    StoreModule.forFeature('views-modal', ViewsModalReducer),
    EffectsModule.forFeature([ViewsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ParishionerProcessesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    ParishionerProcessesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class ParishionerProcessesModule {}
