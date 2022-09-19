import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/reports.reducer';
import { ReportsEffects } from './reducers/reports.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { FormationTypesService } from '@peakitpt/ui-kyrios-api';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';
import { ReportsFormComponent } from './reports-form/reports-form.component';
import { ReportsDeleteComponent } from './reports-delete/reports-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsSearchComponent } from './reports-search/reports-search.component';
import { reducer as reports_permissions_reducer } from '../reports-permissions/reducers/reports-permissions.reducer';
import { ReportsPermissionsEffects } from '../reports-permissions/reducers/reports-permissions.effects';
import { reducer as SubscriptionsModalReducer } from 'src/app/shared/components/modals/subscriptions-modal/reducers/subscriptions-modal.reducer';
import { SubscriptionsModalEffects } from 'src/app/shared/components/modals/subscriptions-modal/reducers/subscriptions-modal.effects';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportsPermissionsFormComponent } from './reports-permissions-form/reports-permissions-form.component';
import { ReportsRowMenuPipe } from './reports-list/reports-list-row-menu.pipe';

@NgModule({
  declarations: [
    ReportsListComponent,
    ReportsDetailsComponent,
    ReportsFormComponent,
    ReportsPermissionsFormComponent,
    ReportsDeleteComponent,
    ReportsSearchComponent,
    ReportsRowMenuPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('reports', reducer),
    EffectsModule.forFeature([ReportsEffects]),
    StoreModule.forFeature('reports-permissions', reports_permissions_reducer),
    EffectsModule.forFeature([ReportsPermissionsEffects]),
    StoreModule.forFeature('subscriptions-modal', SubscriptionsModalReducer),
    EffectsModule.forFeature([SubscriptionsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ReportsRoutingModule,
    SubscriptionSettingsModule,
    MatCheckboxModule,
  ],
  providers: [
    FormationTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class ReportsModule {}
