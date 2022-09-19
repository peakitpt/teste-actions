import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/subscription-statistics.reducer';
import { SubscriptionStatisticsEffects } from './reducers/subscription-statistics.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { SubscriptionStatisticsService } from '@peakitpt/ui-kyrios-api';
import { SubscriptionStatisticsRoutingModule } from './subscription-statistics-routing.module';
import { SubscriptionStatisticsDetailsComponent } from './subscription-statistics-details/subscription-statistics-details.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsModule } from '../reports/reports.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [SubscriptionStatisticsDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('subscription-statistics', reducer),
    EffectsModule.forFeature([SubscriptionStatisticsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    SubscriptionStatisticsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
    NgxChartsModule,
  ],
  providers: [
    SubscriptionStatisticsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class SubscriptionStatisticsModule {}
