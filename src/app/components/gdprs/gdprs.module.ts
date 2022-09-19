import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { GDPRSRoutingModule } from './gdprs-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SubscriptionSettingsModule } from 'src/app/components/subscription-settings/subscription-settings.module';
import { GDPRSDetailsComponent } from './gdprs-details/gdprs-details.component';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';

@NgModule({
  declarations: [GDPRSDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    GDPRSRoutingModule,
    SubscriptionSettingsModule,
    NgxChartsModule,
  ],
  providers: [],
})
export class GDPRSModule {}
