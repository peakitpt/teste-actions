import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/numerations.reducer';
import { NumerationsEffects } from './reducers/numerations.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { NumerationsService } from '@peakitpt/ui-kyrios-api';
import { NumerationsRoutingModule } from './numerations-routing.module';
import { NumerationsListComponent } from './numerations-list/numerations-list.component';
import { NumerationsDetailsComponent } from './numerations-details/numerations-details.component';
import { NumerationsFormComponent } from './numerations-form/numerations-form.component';
import { NumerationsDeleteComponent } from './numerations-delete/numerations-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { NumerationsSearchComponent } from './numerations-search/numerations-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    NumerationsListComponent,
    NumerationsDetailsComponent,
    NumerationsFormComponent,
    NumerationsDeleteComponent,
    NumerationsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('numerations', reducer),
    EffectsModule.forFeature([NumerationsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    NumerationsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    NumerationsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [NumerationsFormComponent],
})
export class NumerationsModule {}
