import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/reports-groupers.reducer';
import { ReportsGroupersEffects } from './reducers/reports-groupers.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { ReportsGroupersService } from '@peakitpt/ui-kyrios-api';
import { ReportsGroupersRoutingModule } from './reports-groupers-routing.module';
import { ReportsGroupersListComponent } from './reports-groupers-list/reports-groupers-list.component';
import { ReportsGroupersDetailsComponent } from './reports-groupers-details/reports-groupers-details.component';
import { ReportsGroupersFormComponent } from './reports-groupers-form/reports-groupers-form.component';
import { ReportsGroupersDeleteComponent } from './reports-groupers-delete/reports-groupers-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsGroupersSearchComponent } from './reports-groupers-search/reports-groupers-search.component';

@NgModule({
  declarations: [
    ReportsGroupersListComponent,
    ReportsGroupersDetailsComponent,
    ReportsGroupersFormComponent,
    ReportsGroupersDeleteComponent,
    ReportsGroupersSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('reports-groupers', reducer),
    EffectsModule.forFeature([ReportsGroupersEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ReportsGroupersRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    ReportsGroupersService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class ReportsGroupersModule {}
