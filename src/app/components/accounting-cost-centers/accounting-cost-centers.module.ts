import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-cost-centers.reducer';
import { AccountingCostCentersEffects } from './reducers/accounting-cost-centers.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { AccountingCostCentersService } from '@peakitpt/ui-kyrios-api';
import { AccountingCostCentersRoutingModule } from './accounting-cost-centers-routing.module';
import { AccountingCostCentersListComponent } from './accounting-cost-centers-list/accounting-cost-centers-list.component';
import { AccountingCostCentersDetailsComponent } from './accounting-cost-centers-details/accounting-cost-centers-details.component';
import { AccountingCostCentersFormComponent } from './accounting-cost-centers-form/accounting-cost-centers-form.component';
import { AccountingCostCentersDeleteComponent } from './accounting-cost-centers-delete/accounting-cost-centers-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { AccountingCostCentersSearchComponent } from './accounting-cost-centers-search/accounting-cost-centers-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    AccountingCostCentersListComponent,
    AccountingCostCentersDetailsComponent,
    AccountingCostCentersFormComponent,
    AccountingCostCentersDeleteComponent,
    AccountingCostCentersSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-cost-centers', reducer),
    EffectsModule.forFeature([AccountingCostCentersEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingCostCentersRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    AccountingCostCentersService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class AccountingCostCentersModule {}
