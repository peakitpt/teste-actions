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
import { BishopricIntegratedViewsService } from '@peakitpt/ui-kyrios-api';
import { BishopricIntegratedViewsRoutingModule } from './bishopric-integrated-views-routing.module';
import { reducer } from './reducers/bishopric-integrated-views.reducer';
import { BishopricIntegratedViewsEffects } from './reducers/bishopric-integrated-views.effects';
import { BishopricIntegratedViewsListComponent } from './bishopric-integrated-views-list/bishopric-integrated-views-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { reducer as base_reducer } from '../base/reducers/base.reducer';
import { SideNavEffects } from '../base/reducers/base.effects';
import { ReportsModule } from '../reports/reports.module';

import { BishopricIntegratedViewsDetailsComponent } from './bishopric-integrated-views-details/bishopric-integrated-views-details.component';
import { BishopricIntegratedViewsSearchComponent } from './bishopric-integrated-views-search/bishopric-integrated-views-search.component';

@NgModule({
  declarations: [
    BishopricIntegratedViewsListComponent,
    BishopricIntegratedViewsDetailsComponent,
    BishopricIntegratedViewsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('bishopric-integrated-views', reducer),
    EffectsModule.forFeature([BishopricIntegratedViewsEffects]),
    StoreModule.forFeature('base', base_reducer),
    EffectsModule.forFeature([SideNavEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    BishopricIntegratedViewsRoutingModule,
    MatCheckboxModule,
    ReportsModule,
  ],
  providers: [
    BishopricIntegratedViewsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class BishopricIntegratedViewsModule {}
