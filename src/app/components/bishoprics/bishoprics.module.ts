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
import { BishopricsService } from '@peakitpt/ui-kyrios-api';
import { BishopricsRoutingModule } from './bishoprics-routing.module';
import { reducer } from './reducers/bishoprics.reducer';
import { BishopricsEffects } from './reducers/bishoprics.effects';
import { BishopricsListComponent } from './bishoprics-list/bishoprics-list.component';
import { BishopricsFormComponent } from './bishoprics-form/bishoprics-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportsModule } from '../reports/reports.module';

import { reducer as CountriesModalReducer } from '../../shared/components/modals/countries-modal/reducers/countries-modal.reducer';
import { CountriesModalEffects } from '../../shared/components/modals/countries-modal/reducers/countries-modal.effects';
import { reducer as ReportsGroupsModalReducer } from '../../shared/components/modals/reports-groups-modal/reducers/reports-groups-modal.reducer';
import { ReportsGroupsModalEffects } from '../../shared/components/modals/reports-groups-modal/reducers/reports-groups-modal.effects';

import { BishopricsDetailsComponent } from './bishoprics-details/bishoprics-details.component';
import { BishopricsDeleteComponent } from './bishoprics-delete/bishoprics-delete.component';
import { BishopricsSearchComponent } from './bishoprics-search/bishoprics-search.component';

@NgModule({
  declarations: [
    BishopricsListComponent,
    BishopricsFormComponent,
    BishopricsDetailsComponent,
    BishopricsDeleteComponent,
    BishopricsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    StoreModule.forFeature('bishoprics', reducer),
    EffectsModule.forFeature([BishopricsEffects]),

    StoreModule.forFeature('countries-modal', CountriesModalReducer),
    EffectsModule.forFeature([CountriesModalEffects]),

    StoreModule.forFeature('reports-groups-modal', ReportsGroupsModalReducer),
    EffectsModule.forFeature([ReportsGroupsModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    BishopricsRoutingModule,
    MatCheckboxModule,
    ReportsModule,
  ],
  providers: [
    BishopricsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class BishopricsModule {}
