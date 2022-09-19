import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/nominations.reducer';
import { NominationsEffects } from './reducers/nominations.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { NominationsService } from '@peakitpt/ui-kyrios-api';
import { NominationsRoutingModule } from './nominations-routing.module';
import { NominationsListComponent } from './nominations-list/nominations-list.component';
import { NominationsDetailsComponent } from './nominations-details/nominations-details.component';
import { NominationsFormComponent } from './nominations-form/nominations-form.component';
import { NominationsDeleteComponent } from './nominations-delete/nominations-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { NominationsSearchComponent } from './nominations-search/nominations-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as PriestsModalReducer } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { PriestsV1ModalEffects } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.effects';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { reducer as CuriaFunctionsModalReducer } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { CuriaFunctionsModalEffects } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.effects';

@NgModule({
  declarations: [
    NominationsListComponent,
    NominationsDetailsComponent,
    NominationsFormComponent,
    NominationsDeleteComponent,
    NominationsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('nominations', reducer),
    EffectsModule.forFeature([NominationsEffects]),
    StoreModule.forFeature('priests-v1-modal', PriestsModalReducer),
    EffectsModule.forFeature([PriestsV1ModalEffects]),
    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),
    StoreModule.forFeature('curia-functions-modal', CuriaFunctionsModalReducer),
    EffectsModule.forFeature([CuriaFunctionsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    NominationsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    NominationsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [NominationsFormComponent],
})
export class NominationsModule {}
