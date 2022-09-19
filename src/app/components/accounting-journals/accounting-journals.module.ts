import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/accounting-journals.reducer';
import { AccountingJournalsEffects } from './reducers/accounting-journals.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { AccountingJournalsService } from '@peakitpt/ui-kyrios-api';
import { AccountingJournalsRoutingModule } from './accounting-journals-routing.module';
import { AccountingJournalsListComponent } from './accounting-journals-list/accounting-journals-list.component';
import { AccountingJournalsDetailsComponent } from './accounting-journals-details/accounting-journals-details.component';
import { AccountingJournalsFormComponent } from './accounting-journals-form/accounting-journals-form.component';
import { AccountingJournalsDeleteComponent } from './accounting-journals-delete/accounting-journals-delete.component';
import { AccountingJournalsSearchComponent } from './accounting-journals-search/accounting-journals-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    AccountingJournalsListComponent,
    AccountingJournalsDetailsComponent,
    AccountingJournalsFormComponent,
    AccountingJournalsDeleteComponent,
    AccountingJournalsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('accounting-journals', reducer),
    EffectsModule.forFeature([AccountingJournalsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    AccountingJournalsRoutingModule,
    ReportsModule,
  ],
  providers: [
    AccountingJournalsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class AccountingJournalsModule {}
