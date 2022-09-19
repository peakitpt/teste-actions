import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/formations.reducer';
import { FormationsEffects } from './reducers/formations.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { FormationsService } from '@peakitpt/ui-kyrios-api';
import { FormationsRoutingModule } from './formations-routing.module';
import { FormationsListComponent } from './formations-list/formations-list.component';
import { FormationsDetailsComponent } from './formations-details/formations-details.component';
import { FormationsFormComponent } from './formations-form/formations-form.component';
import { FormationsDeleteComponent } from './formations-delete/formations-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { reducer as formationTypesModalReducer } from 'src/app/shared/components/modals/formation-types-modal/reducers/formation-types-modal.reducer';
import { FormationTypesModalEffects } from 'src/app/shared/components/modals/formation-types-modal/reducers/formation-types-modal.effects';
import { FormationsSearchComponent } from './formations-search/formations-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    FormationsListComponent,
    FormationsDetailsComponent,
    FormationsFormComponent,
    FormationsDeleteComponent,
    FormationsSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('formations', reducer),
    EffectsModule.forFeature([FormationsEffects]),
    StoreModule.forFeature('formation-types-modal', formationTypesModalReducer),
    EffectsModule.forFeature([FormationTypesModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    FormationsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule
  ],
  providers: [
    FormationsService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ]
})
export class FormationsModule {}
