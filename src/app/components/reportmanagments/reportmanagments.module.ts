import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/reportmanagments.reducer';
import { ReportmanagmentsEffects } from './reducers/reportmanagments.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { ReportmanagmentsService } from '@peakitpt/ui-kyrios-api';
import { ReportmanagmentsRoutingModule } from './reportmanagments-routing.module';
import { ReportmanagmentsFormComponent } from './reportmanagments-form/reportmanagments-form.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [ReportmanagmentsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('reportmanagments', reducer),
    EffectsModule.forFeature([ReportmanagmentsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ReportmanagmentsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    ReportmanagmentsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class ReportmanagmentsModule {}
