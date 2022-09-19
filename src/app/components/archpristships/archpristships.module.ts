import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { ArchpristshipsService } from '@peakitpt/ui-kyrios-api';
import { ArchpristshipsRoutingModule } from './archpristships-routing.module';
import { reducer } from './reducers/archpristships.reducer';
import { ArchpristshipsEffects } from './reducers/archpristships.effects';
import { ArchpristshipsListComponent } from './archpristships-list/archpristships-list.component';
import { ArchpristshipsFormComponent } from './archpristships-form/archpristships-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportsModule } from '../reports/reports.module';

import { reducer as BishopricsModalReducer } from '../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.reducer';
import { BishopricsModalEffects } from '../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.effects';
import { ArchpristshipsDetailsComponent } from './archpristships-details/archpristships-details.component';
import { ArchpristshipsDeleteComponent } from './archpristships-delete/archpristships-delete.component';
import { ArchpristshipsSearchComponent } from './archpristships-search/archpristships-search.component';
import { BishopricsModule } from '../bishoprics/bishoprics.module';

@NgModule({
  declarations: [
    ArchpristshipsListComponent,
    ArchpristshipsFormComponent,
    ArchpristshipsDetailsComponent,
    ArchpristshipsDeleteComponent,
    ArchpristshipsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('archpristships', reducer),
    EffectsModule.forFeature([ArchpristshipsEffects]),
    StoreModule.forFeature('bishoprics-modal', BishopricsModalReducer),
    EffectsModule.forFeature([BishopricsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ArchpristshipsRoutingModule,
    MatCheckboxModule,
    ReportsModule,
    BishopricsModule,
  ],
  providers: [
    ArchpristshipsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class ArchpristshipsModule {}
