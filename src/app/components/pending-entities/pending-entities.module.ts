import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  NewsletterGroupSubscriptionsService,
  PersonsService,
} from '@peakitpt/ui-kyrios-api';
import { PendingEntitiesRoutingModule } from './pending-entities-routing.module';
import { PendingEntitiesListComponent } from './pending-entities-list/pending-entities-list.component';
import { reducer } from './reducers/pending-entities.reducer';
import { PendingEntitiesEffects } from './reducers/pending-entities.effects';
import { PendingEntitiesDetailsComponent } from './pending-entities-details/pending-entities-details.component';
import { ReportsModule } from '../reports/reports.module';
import { PendingEntitiesSearchComponent } from './pending-entities-search/pending-entities-search.component';

@NgModule({
  declarations: [
    PendingEntitiesListComponent,
    PendingEntitiesDetailsComponent,
    PendingEntitiesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule,
    EffectsModule,

    StoreModule.forFeature('pending-entities', reducer),
    EffectsModule.forFeature([PendingEntitiesEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,

    PendingEntitiesRoutingModule,
    ReportsModule,
  ],
  providers: [
    PersonsService,
    NewsletterGroupSubscriptionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class PendingEntitiesModule {}
