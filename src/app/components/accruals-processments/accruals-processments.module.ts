import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accruals-processments.reducer';
import { AccrualsProcessmentsEffects } from './reducers/accruals-processments.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccrualsProcessmentsService } from '@peakitpt/ui-kyrios-api';
import { AccrualsProcessmentsRoutingModule } from './accruals-processments-routing.module';
import { AccrualsProcessmentsListComponent } from './accruals-processments-list/accruals-processments-list.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccrualsProcessmentsSearchComponent } from './accruals-processments-search/accruals-processments-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    AccrualsProcessmentsListComponent,
    AccrualsProcessmentsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accruals-processments', reducer),
    EffectsModule.forFeature([AccrualsProcessmentsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccrualsProcessmentsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccrualsProcessmentsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class AccrualsProcessmentsModule {}
