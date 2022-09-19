import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/events.reducer';
import { reducer as ContentsModalReducer } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.reducer';
import { ContentsModalEffects } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.effects';
import { reducer as PersonsModalReducer } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { PersonsModalEffects } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.effects';
import { EventsEffects } from './reducers/events.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { EventsService } from '@peakitpt/ui-kyrios-api';
import { EventsRoutingModule } from './events-routing.module';
import { ReportsModule } from '../reports/reports.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { EventsFormComponent } from './events-form/events-form.component';
import { EventsDeleteComponent } from './events-delete/events-delete.component';
import { EventsSearchComponent } from './events-search/events-search.component';
import { EventsHistoryModalComponent } from './events-history-modal/events-history-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsDetailsComponent,
    EventsFormComponent,
    EventsDeleteComponent,
    EventsSearchComponent,
    EventsHistoryModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('events', reducer),
    EffectsModule.forFeature([EventsEffects]),
    StoreModule.forFeature('contents-modal', ContentsModalReducer),
    EffectsModule.forFeature([ContentsModalEffects]),
    StoreModule.forFeature('persons-modal', PersonsModalReducer),
    EffectsModule.forFeature([PersonsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    EventsRoutingModule,
    ReportsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    EventsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class EventsModule {}
