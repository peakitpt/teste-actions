import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/sections.reducer';
import { SectionsEffects } from './reducers/sections.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { SectionsService } from '@peakitpt/ui-kyrios-api';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsListComponent } from './sections-list/sections-list.component';
import { SectionsDetailsComponent } from './sections-details/sections-details.component';
import { SectionsFormComponent } from './sections-form/sections-form.component';
import { SectionsDeleteComponent } from './sections-delete/sections-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { SectionsSearchComponent } from './sections-search/sections-search.component';

@NgModule({
  declarations: [
    SectionsListComponent,
    SectionsDetailsComponent,
    SectionsFormComponent,
    SectionsDeleteComponent,
    SectionsSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('sections', reducer),
    EffectsModule.forFeature([SectionsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    SectionsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule
  ],
  providers: [
    SectionsService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ]
})
export class SectionsModule {}
