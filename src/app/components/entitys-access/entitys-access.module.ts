import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/entitys-access.reducer';
import { EntitysAccessEffects } from './reducers/entitys-access.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { EntitysAccessService } from '@peakitpt/ui-kyrios-api';
import { EntitysAccessRoutingModule } from './entitys-access-routing.module';
import { EntitysAccessListComponent } from './entitys-access-list/entitys-access-list.component';
import { EntitysAccessDeleteComponent } from './entitys-access-delete/entitys-access-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { EntitysAccessSearchComponent } from './entitys-access-search/entitys-access-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    EntitysAccessListComponent,
    EntitysAccessDeleteComponent,
    EntitysAccessSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('entitys-access', reducer),
    EffectsModule.forFeature([EntitysAccessEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    EntitysAccessRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    EntitysAccessService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class EntitysAccessModule {}
