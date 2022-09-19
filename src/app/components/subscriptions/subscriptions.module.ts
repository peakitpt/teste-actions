import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/subscriptions.reducer';
import { SubscriptionsEffects } from './reducers/subscriptions.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsListComponent } from './subscriptions-list/subscriptions-list.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { SubscriptionsSearchComponent } from './subscriptions-search/subscriptions-search.component';
import { SubscriptionsFormComponent } from './subscriptions-form/subscriptions-form.component';

import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { reducer as UsersModalReducer } from 'src/app/shared/components/modals/users-modal/reducers/users-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { UsersModalEffects } from 'src/app/shared/components/modals/users-modal/reducers/users-modal.effects';

@NgModule({
  declarations: [
    SubscriptionsListComponent,
    SubscriptionsSearchComponent,
    SubscriptionsFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('subscriptions', reducer),
    EffectsModule.forFeature([SubscriptionsEffects]),
    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),
    StoreModule.forFeature('users-modal', UsersModalReducer),
    EffectsModule.forFeature([UsersModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    SubscriptionsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    SubscriptionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class SubscriptionsModule {}
