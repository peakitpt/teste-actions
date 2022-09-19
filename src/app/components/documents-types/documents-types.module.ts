import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/documents-types.reducer';
import { DocumentsTypesEffects } from './reducers/documents-types.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { DocumentsTypesService } from '@peakitpt/ui-kyrios-api';
import { DocumentsTypesRoutingModule } from './documents-types-routing.module';
import { DocumentsTypesListComponent } from './documents-types-list/documents-types-list.component';
import { DocumentsTypesDetailsComponent } from './documents-types-details/documents-types-details.component';
import { DocumentsTypesFormComponent } from './documents-types-form/documents-types-form.component';
import { DocumentsTypesDeleteComponent } from './documents-types-delete/documents-types-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { DocumentsTypesSearchComponent } from './documents-types-search/documents-types-search.component';
import { ReportsModule } from '../reports/reports.module';
import { DocumentsTypesRowMenuPipe } from './documents-types-list/documents-types-list-row-menu.pipe';

@NgModule({
  declarations: [
    DocumentsTypesListComponent,
    DocumentsTypesDetailsComponent,
    DocumentsTypesFormComponent,
    DocumentsTypesDeleteComponent,
    DocumentsTypesSearchComponent,
    DocumentsTypesRowMenuPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('documents-types', reducer),
    EffectsModule.forFeature([DocumentsTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    DocumentsTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    DocumentsTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class DocumentsTypesModule {}
