import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';

import { reducer } from './reducers/emenus.reducer';
import { reducer as contentsModalReducer } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.reducer';
import { reducer as sectionsModalReducer } from 'src/app/shared/components/modals/sections-modal/reducers/sections-modal.reducer';
import { reducer as layoutsModalReducer } from 'src/app/shared/components/modals/layouts-modal/reducers/layouts-modal.reducer';
import { EmenusEffects } from './reducers/emenus.effects';
import { ContentsModalEffects } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.effects';
import { SectionsModalEffects } from 'src/app/shared/components/modals/sections-modal/reducers/sections-modal.effects';
import { LayoutsModalEffects } from 'src/app/shared/components/modals/layouts-modal/reducers/layouts-modal.effects';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { EmenusService } from '@peakitpt/ui-kyrios-api';
import { EmenusRoutingModule } from './emenus-routing.module';
import { EmenusListComponent } from './emenus-list/emenus-list.component';
import { EmenusDetailsComponent } from './emenus-details/emenus-details.component';
import { EmenusFormComponent } from './emenus-form/emenus-form.component';
import { EmenusDeleteComponent } from './emenus-delete/emenus-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { EmenusSearchComponent } from './emenus-search/emenus-search.component';
import { ReportsModule } from '../reports/reports.module';
import { ContentsModule } from '../contents/contents.module';

@NgModule({
  declarations: [
    EmenusListComponent,
    EmenusDetailsComponent,
    EmenusFormComponent,
    EmenusDeleteComponent,
    EmenusSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('emenus', reducer),
    EffectsModule.forFeature([EmenusEffects]),

    StoreModule.forFeature('contents-modal', contentsModalReducer),
    EffectsModule.forFeature([ContentsModalEffects]),
    StoreModule.forFeature('sections-modal', sectionsModalReducer),
    EffectsModule.forFeature([SectionsModalEffects]),
    StoreModule.forFeature('layouts-modal', layoutsModalReducer),
    EffectsModule.forFeature([LayoutsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    EmenusRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,

    // Quick Insertion
    ContentsModule,
  ],
  providers: [
    EmenusService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class EmenusModule {}
