import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/admin-statistics.reducer';
import { AdminStatisticsEffects } from './reducers/admin-statistics.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { AdminStatisticsService } from '@peakitpt/ui-kyrios-api';
import { AdminStatisticsRoutingModule } from './admin-statistics-routing.module';
import { AdminStatisticsDetailsComponent } from './admin-statistics-details/admin-statistics-details.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsModule } from '../reports/reports.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [AdminStatisticsDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('admin-statistics', reducer),
    EffectsModule.forFeature([AdminStatisticsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AdminStatisticsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
    NgxChartsModule,
  ],
  providers: [
    AdminStatisticsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class AdminStatisticsModule {}
