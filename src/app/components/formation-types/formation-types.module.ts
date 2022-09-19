import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/formation-types.reducer';
import { FormationTypesEffects } from './reducers/formation-types.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { FormationTypesService } from '@peakitpt/ui-kyrios-api';
import { FormationTypesRoutingModule } from './formation-types-routing.module';
import { FormationTypesListComponent } from './formation-types-list/formation-types-list.component';
import { FormationTypesDetailsComponent } from './formation-types-details/formation-types-details.component';
import { FormationTypesFormComponent } from './formation-types-form/formation-types-form.component';
import { FormationTypesDeleteComponent } from './formation-types-delete/formation-types-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { FormationTypesSearchComponent } from './formation-types-search/formation-types-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    FormationTypesListComponent,
    FormationTypesDetailsComponent,
    FormationTypesFormComponent,
    FormationTypesDeleteComponent,
    FormationTypesSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('formation-types', reducer),
    EffectsModule.forFeature([FormationTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    FormationTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule
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
export class FormationTypesModule {}
