import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/valences.reducer';
import { ValencesEffects } from './reducers/valences.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { ValencesService } from '@peakitpt/ui-kyrios-api';
import { ValencesRoutingModule } from './valences-routing.module';
import { ValencesListComponent } from './valences-list/valences-list.component';
import { ValencesDetailsComponent } from './valences-details/valences-details.component';
import { ValencesFormComponent } from './valences-form/valences-form.component';
import { ValencesDeleteComponent } from './valences-delete/valences-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ValencesSearchComponent } from './valences-search/valences-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    ValencesListComponent,
    ValencesDetailsComponent,
    ValencesFormComponent,
    ValencesDeleteComponent,
    ValencesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('valences', reducer),
    EffectsModule.forFeature([ValencesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ValencesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    ValencesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [ValencesFormComponent],
})
export class ValencesModule {}
