import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/numerations-views.reducer';
import { NumerationsViewsEffects } from './reducers/numerations-views.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { NumerationsViewsService } from '@peakitpt/ui-kyrios-api';
import { NumerationsViewsRoutingModule } from './numerations-views-routing.module';
import { NumerationsViewsListComponent } from './numerations-views-list/numerations-views-list.component';
import { NumerationsViewsDetailsComponent } from './numerations-views-details/numerations-views-details.component';
import { NumerationsViewsFormComponent } from './numerations-views-form/numerations-views-form.component';
import { NumerationsViewsDeleteComponent } from './numerations-views-delete/numerations-views-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { NumerationsViewsSearchComponent } from './numerations-views-search/numerations-views-search.component';
import { ReportsModule } from '../reports/reports.module';

import { reducer as numerationsModalReducer } from 'src/app/shared/components/modals/numerations-modal/reducers/numerations-modal.reducer';
import { NumerationsModalEffects } from 'src/app/shared/components/modals/numerations-modal/reducers/numerations-modal.effects';

@NgModule({
  declarations: [
    NumerationsViewsListComponent,
    NumerationsViewsDetailsComponent,
    NumerationsViewsFormComponent,
    NumerationsViewsDeleteComponent,
    NumerationsViewsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('numerations-views', reducer),
    EffectsModule.forFeature([NumerationsViewsEffects]),
    StoreModule.forFeature('numerations-modal', numerationsModalReducer),
    EffectsModule.forFeature([NumerationsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    NumerationsViewsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    NumerationsViewsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [NumerationsViewsFormComponent],
})
export class NumerationsViewsModule {}
