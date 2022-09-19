import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/subscription-users.reducer';
import { SubscriptionUsersEffects } from './reducers/subscription-users.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { SubscriptionUsersService } from '@peakitpt/ui-kyrios-api';
import { SubscriptionUsersRoutingModule } from './subscription-users-routing.module';
import { SubscriptionUsersListComponent } from './subscription-users-list/subscription-users-list.component';
import { SubscriptionUsersDetailsComponent } from './subscription-users-details/subscription-users-details.component';
import { SubscriptionUsersFormComponent } from './subscription-users-form/subscription-users-form.component';
import { SubscriptionUsersDeleteComponent } from './subscription-users-delete/subscription-users-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { SubscriptionUsersSearchComponent } from './subscription-users-search/subscription-users-search.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    SubscriptionUsersListComponent,
    SubscriptionUsersDetailsComponent,
    SubscriptionUsersFormComponent,
    SubscriptionUsersDeleteComponent,
    SubscriptionUsersSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('subscription-users', reducer),
    EffectsModule.forFeature([SubscriptionUsersEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    SubscriptionUsersRoutingModule,
    SubscriptionSettingsModule,
    MatCheckboxModule,
    ReportsModule
  ],
  providers: [
    SubscriptionUsersService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ]
})
export class SubscriptionUsersModule {}
