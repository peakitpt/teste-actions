import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/user-newsletters.reducer';
import { UserNewslettersEffects } from './reducers/user-newsletters.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { NewsletterReadStatusesService } from '@peakitpt/ui-kyrios-api';
import { UserNewslettersRoutingModule } from './user-newsletters-routing.module';
import { UserNewslettersListComponent } from './user-newsletters-list/user-newsletters-list.component';
import { UserNewslettersDetailsComponent } from './user-newsletters-details/user-newsletters-details.component';
import { UserNewslettersDeleteComponent } from './user-newsletters-delete/user-newsletters-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { UserNewslettersSearchComponent } from './user-newsletters-search/user-newsletters-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    UserNewslettersListComponent,
    UserNewslettersDetailsComponent,
    UserNewslettersDeleteComponent,
    UserNewslettersSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('user-newsletters', reducer),
    EffectsModule.forFeature([UserNewslettersEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    UserNewslettersRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule
  ],
  providers: [
    NewsletterReadStatusesService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ]
})
export class UserNewslettersModule {}
