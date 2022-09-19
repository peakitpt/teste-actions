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
import { ReportsModule } from '../reports/reports.module';

import { reducer as GroupsModalReducer } from 'src/app/shared/components/modals/groups-modal/reducers/groups-modal.reducer';
import { GroupsModalEffects } from 'src/app/shared/components/modals/groups-modal/reducers/groups-modal.effects';
import { reducer } from './reducers/text-messages.reducer';
import { TextMessagesService } from '@peakitpt/ui-kyrios-api';
import { TextMessagesEffects } from './reducers/text-messages.effects';
import { TextMessagesRoutingModule } from './text-messages-routing.module';
import { TextMessagesListComponent } from './text-messages-list/text-messages-list.component';
import { TextMessagesDetailsComponent } from './text-messages-details/text-messages-details.component';
import { TextMessagesFormComponent } from './text-messages-form/text-messages-form.component';
import { TextMessagesSendTestComponent } from './text-messages-send-test/text-messages-send-test.component';
import { TextMessagesDeleteComponent } from './text-messages-delete/text-messages-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { TextMessagesSearchComponent } from './text-messages-search/text-messages-search.component';

@NgModule({
  declarations: [
    TextMessagesListComponent,
    TextMessagesFormComponent,
    TextMessagesDetailsComponent,
    TextMessagesDeleteComponent,
    TextMessagesSearchComponent,
    TextMessagesSendTestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('text-messages', reducer),
    EffectsModule.forFeature([TextMessagesEffects]),

    StoreModule.forFeature('groups-modal', GroupsModalReducer),
    EffectsModule.forFeature([GroupsModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    TextMessagesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    TextMessagesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class TextMessagesModule {}
