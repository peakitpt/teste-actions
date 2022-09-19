import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/records-importers.reducer';
import { RecordsImportersEffects } from './reducers/records-importers.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { RecordsImportersService } from '@peakitpt/ui-kyrios-api';
import { RecordsImportersRoutingModule } from './records-importers-routing.module';
import { RecordsImportersFormComponent } from './records-importers-form/records-importers-form.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [RecordsImportersFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('records-importers', reducer),
    EffectsModule.forFeature([RecordsImportersEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    RecordsImportersRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    RecordsImportersService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class RecordsImportersModule {}
