import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardService } from '@peakitpt/ui-kyrios-api';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PendingEntitiesEffects } from '../pending-entities/reducers/pending-entities.effects';
import { reducer as pendingEntitiesReducer } from '../pending-entities/reducers/pending-entities.reducer';
import { ReportsModule } from '../reports/reports.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardEffects } from './reducers/dashboard.effects';
import { reducer as dashboardReducer } from './reducers/dashboard.reducer';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
    StoreModule.forFeature('pending-entities', pendingEntitiesReducer),
    EffectsModule.forFeature([PendingEntitiesEffects]),
    UiMaterialModule,
    NgxChartsModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    DashboardRoutingModule,
    ReportsModule,
  ],
  providers: [
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class DashboardModule {}
