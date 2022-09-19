import { PageModule } from './../page.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/reports-permissions.reducer';
import { ReportsPermissionsEffects } from './reducers/reports-permissions.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { FormationTypesService } from '@peakitpt/ui-kyrios-api';
import { ReportsPermissionsRoutingModule } from './reports-permissions-routing.module';
import { ReportsPermissionsListComponent } from './reports-permissions-list/reports-permissions-list.component';
import { ReportsPermissionsDetailsComponent } from './reports-permissions-details/reports-permissions-details.component';
import { ReportsPermissionsFormComponent } from './reports-permissions-form/reports-permissions-form.component';
import { ReportsPermissionsDeleteComponent } from './reports-permissions-delete/reports-permissions-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ReportsPermissionsSearchComponent } from './reports-permissions-search/reports-permissions-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    ReportsPermissionsListComponent,
    ReportsPermissionsDetailsComponent,
    ReportsPermissionsFormComponent,
    ReportsPermissionsDeleteComponent,
    ReportsPermissionsSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('reports-permissions', reducer),
    EffectsModule.forFeature([ReportsPermissionsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ReportsPermissionsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
    PageModule
  ],
  providers: [
    FormationTypesService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ]
})
export class ReportsPermissionsModule {}
