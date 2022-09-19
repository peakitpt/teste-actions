import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/groups.reducer';
import { GroupsEffects } from './reducers/groups.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { GroupsService } from '@peakitpt/ui-kyrios-api';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsDetailsComponent } from './groups-details/groups-details.component';
import { GroupsFormComponent } from './groups-form/groups-form.component';
import { GroupsDeleteComponent } from './groups-delete/groups-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { GroupsSearchComponent } from './groups-search/groups-search.component';

@NgModule({
  declarations: [
    GroupsListComponent,
    GroupsDetailsComponent,
    GroupsFormComponent,
    GroupsDeleteComponent,
    GroupsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('groups', reducer),
    EffectsModule.forFeature([GroupsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    GroupsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    GroupsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class GroupsModule {}
