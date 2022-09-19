import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/users.reducer';
import { UsersEffects } from './reducers/users.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { reducer as BishopricsModalReducer } from 'src/app/shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.reducer';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { reducer as SubscriptionsReducer } from 'src/app/components/subscriptions/reducers/subscriptions.reducer';
import { UsersService } from '@peakitpt/ui-kyrios-api';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { UsersSearchComponent } from './users-search/users-search.component';
import { BishopricsModalEffects } from 'src/app/shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.effects';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { SubscriptionsEffects } from 'src/app/components/subscriptions/reducers/subscriptions.effects';
import { ReportsModule } from '../reports/reports.module';
import { UsersChangePasswordComponent } from './users-change-password/users-change-password.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailsComponent,
    UsersFormComponent,
    UsersDeleteComponent,
    UsersSearchComponent,
    UsersChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UsersEffects]),
    StoreModule.forFeature('subscriptions', SubscriptionsReducer),
    EffectsModule.forFeature([SubscriptionsEffects]),
    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),
    StoreModule.forFeature('bishoprics-modal', BishopricsModalReducer),
    EffectsModule.forFeature([BishopricsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    UsersRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    UsersService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class UsersModule {}
