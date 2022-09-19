import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/current-accounts.reducer';
import { CurrentAccountsEffects } from './reducers/current-accounts.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { CurrentAccountsService } from '@peakitpt/ui-kyrios-api';
import { CurrentAccountsRoutingModule } from './current-accounts-routing.module';
import { CurrentAccountsListComponent } from './current-accounts-list/current-accounts-list.component';
import { CurrentAccountsDetailsComponent } from './current-accounts-details/current-accounts-details.component';
import { CurrentAccountsFormComponent } from './current-accounts-form/current-accounts-form.component';
import { CurrentAccountsDeleteComponent } from './current-accounts-delete/current-accounts-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CurrentAccountsSearchComponent } from './current-accounts-search/current-accounts-search.component';
import { ReportsModule } from '../reports/reports.module';
import { FilterPendingPipe } from './current-accounts-details/filter-pending.component.pipe';
import { CurrentAccountsReceiptsTableComponent } from './current-accounts-receipts-table/current-accounts-receipts-table.component';
import { CurrentAccountsReceiptsDetailsComponent } from './current-accounts-receipts-details/current-accounts-receipts-details.component';
import { CurrentAccountsListBalancePipe } from './current-accounts-list/current-accounts-list-balance.pipe';

@NgModule({
  declarations: [
    CurrentAccountsListComponent,
    CurrentAccountsDetailsComponent,
    CurrentAccountsFormComponent,
    CurrentAccountsDeleteComponent,
    CurrentAccountsSearchComponent,
    CurrentAccountsReceiptsDetailsComponent,
    CurrentAccountsReceiptsTableComponent,
    FilterPendingPipe,
    CurrentAccountsListBalancePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('current-accounts', reducer),
    EffectsModule.forFeature([CurrentAccountsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    CurrentAccountsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    CurrentAccountsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [CurrentAccountsFormComponent],
})
export class CurrentAccountsModule {}
