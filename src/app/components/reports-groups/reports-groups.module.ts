import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/reports-groups.reducer';
import { ReportsGroupsEffects } from './reducers/reports-groups.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { ReportsGroupsService } from '@peakitpt/ui-kyrios-api';
import { ReportsGroupsRoutingModule } from './reports-groups-routing.module';
import { ReportsGroupsListComponent } from './reports-groups-list/reports-groups-list.component';
import { ReportsGroupsDetailsComponent } from './reports-groups-details/reports-groups-details.component';
import { ReportsGroupsFormComponent } from './reports-groups-form/reports-groups-form.component';
import { ReportsGroupsDeleteComponent } from './reports-groups-delete/reports-groups-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsGroupsSearchComponent } from './reports-groups-search/reports-groups-search.component';

import { reducer as reports_groupers_modal_reducer } from '../../shared/components/modals/reports-groupers-modal/reducers/reports-groupers-modal.reducer';
import { ReportsGroupersModalEffects } from '../../shared/components/modals/reports-groupers-modal/reducers/reports-groupers-modal.effects';
import { reducer as reports_modal_reducer } from '../../shared/components/modals/reports-modal/reducers/reports-modal.reducer';
import { ReportsModalEffects } from '../../shared/components/modals/reports-modal/reducers/reports-modal.effects';

@NgModule({
  declarations: [
    ReportsGroupsListComponent,
    ReportsGroupsDetailsComponent,
    ReportsGroupsFormComponent,
    ReportsGroupsDeleteComponent,
    ReportsGroupsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('reports-groups', reducer),
    EffectsModule.forFeature([ReportsGroupsEffects]),
    StoreModule.forFeature(
      'reports-groupers-modal',
      reports_groupers_modal_reducer
    ),
    EffectsModule.forFeature([ReportsGroupersModalEffects]),
    StoreModule.forFeature('reports-modal', reports_modal_reducer),
    EffectsModule.forFeature([ReportsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ReportsGroupsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    ReportsGroupsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class ReportsGroupsModule {}
