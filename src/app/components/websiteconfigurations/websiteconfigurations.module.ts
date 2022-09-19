import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/websiteconfigurations.reducer';
import { WebsiteconfigurationsEffects } from './reducers/websiteconfigurations.effects';
import { reducer as contentsModalReducer } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.reducer';
import { reducer as sectionsModalReducer } from 'src/app/shared/components/modals/sections-modal/reducers/sections-modal.reducer';
import { ContentsModalEffects } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.effects';
import { SectionsModalEffects } from 'src/app/shared/components/modals/sections-modal/reducers/sections-modal.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { WebsiteconfigurationsService } from '@peakitpt/ui-kyrios-api';
import { WebsiteconfigurationsRoutingModule } from './websiteconfigurations-routing.module';
import { WebsiteconfigurationsFormComponent } from './websiteconfigurations-form/websiteconfigurations-form.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [WebsiteconfigurationsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('websiteconfigurations', reducer),
    EffectsModule.forFeature([WebsiteconfigurationsEffects]),
    StoreModule.forFeature('contents-modal', contentsModalReducer),
    EffectsModule.forFeature([ContentsModalEffects]),
    StoreModule.forFeature('sections-modal', sectionsModalReducer),
    EffectsModule.forFeature([SectionsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    WebsiteconfigurationsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule
  ],
  providers: [
    WebsiteconfigurationsService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ]
})
export class WebsiteconfigurationsModule {}
