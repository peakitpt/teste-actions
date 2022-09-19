import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/subscription-settings.reducer';
import { SubscriptionSettingsEffects } from './reducers/subscription-settings.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { SubscriptionSettingsService } from '@peakitpt/ui-kyrios-api';
import { SubscriptionSettingsRoutingModule } from './subscription-settings-routing.module';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { SubscriptionSettingsFormComponent } from './subscription-settings-form/subscription-settings-form.component';
import { reducer as ParishionersModalReducer } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { ParishionersModalEffects } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.effects';
import { reducer as DocumentsTypesModalReducer } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { DocumentsTypesModalEffects } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.effects';
import { reducer as NewslettersLayoutsModalReducer } from 'src/app/shared/components/modals/newsletters-layouts-modal/reducers/newsletters-layouts-modal.reducer';
import { NewslettersLayoutsModalEffects } from 'src/app/shared/components/modals/newsletters-layouts-modal/reducers/newsletters-layouts-modal.effects';
import { reducer as InstitutionsModalReducer } from 'src/app/shared/components/modals/institutions-modal/reducers/institutions-modal.reducer';
import { InstitutionsModalEffects } from 'src/app/shared/components/modals/institutions-modal/reducers/institutions-modal.effects';

@NgModule({
  declarations: [SubscriptionSettingsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('subscription-settings', reducer),
    EffectsModule.forFeature([SubscriptionSettingsEffects]),
    StoreModule.forFeature('parishioners-modal', ParishionersModalReducer),
    EffectsModule.forFeature([ParishionersModalEffects]),
    StoreModule.forFeature('documents-types-modal', DocumentsTypesModalReducer),
    EffectsModule.forFeature([DocumentsTypesModalEffects]),
    StoreModule.forFeature(
      'newsletters-layouts-modal',
      NewslettersLayoutsModalReducer
    ),
    EffectsModule.forFeature([NewslettersLayoutsModalEffects]),
    StoreModule.forFeature('institutions-modal', InstitutionsModalReducer),
    EffectsModule.forFeature([InstitutionsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    SubscriptionSettingsRoutingModule,
  ],
  exports: [],
  providers: [
    SubscriptionSettingsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class SubscriptionSettingsModule {}
