import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/pastoral-agents-types.reducer';
import { PastoralAgentsTypesEffects } from './reducers/pastoral-agents-types.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { PastoralAgentsTypesService } from '@peakitpt/ui-kyrios-api';
import { PastoralAgentsTypesRoutingModule } from './pastoral-agents-types-routing.module';
import { PastoralAgentsTypesListComponent } from './pastoral-agents-types-list/pastoral-agents-types-list.component';
import { PastoralAgentsTypesDetailsComponent } from './pastoral-agents-types-details/pastoral-agents-types-details.component';
import { PastoralAgentsTypesFormComponent } from './pastoral-agents-types-form/pastoral-agents-types-form.component';
import { PastoralAgentsTypesDeleteComponent } from './pastoral-agents-types-delete/pastoral-agents-types-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { PastoralAgentsTypesSearchComponent } from './pastoral-agents-types-search/pastoral-agents-types-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    PastoralAgentsTypesListComponent,
    PastoralAgentsTypesDetailsComponent,
    PastoralAgentsTypesFormComponent,
    PastoralAgentsTypesDeleteComponent,
    PastoralAgentsTypesSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('pastoral-agents-types', reducer),
    EffectsModule.forFeature([PastoralAgentsTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    PastoralAgentsTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule
  ],
  providers: [
    PastoralAgentsTypesService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ]
})
export class PastoralAgentsTypesModule {}
