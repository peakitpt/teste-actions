import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/module-documentation-links.reducer';
import { ModuleDocumentationLinksEffects } from './reducers/module-documentation-links.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { ModuleDocumentationLinksService } from '@peakitpt/ui-kyrios-api';
import { ModuleDocumentationLinksRoutingModule } from './module-documentation-links-routing.module';
import { ModuleDocumentationLinksListComponent } from './module-documentation-links-list/module-documentation-links-list.component';
import { ModuleDocumentationLinksDetailsComponent } from './module-documentation-links-details/module-documentation-links-details.component';
import { ModuleDocumentationLinksFormComponent } from './module-documentation-links-form/module-documentation-links-form.component';
import { ModuleDocumentationLinksDeleteComponent } from './module-documentation-links-delete/module-documentation-links-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ModuleDocumentationLinksSearchComponent } from './module-documentation-links-search/module-documentation-links-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    ModuleDocumentationLinksListComponent,
    ModuleDocumentationLinksDetailsComponent,
    ModuleDocumentationLinksFormComponent,
    ModuleDocumentationLinksDeleteComponent,
    ModuleDocumentationLinksSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('module-documentation-links', reducer),
    EffectsModule.forFeature([ModuleDocumentationLinksEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ModuleDocumentationLinksRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    ModuleDocumentationLinksService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [ModuleDocumentationLinksFormComponent],
})
export class ModuleDocumentationLinksModule {}
