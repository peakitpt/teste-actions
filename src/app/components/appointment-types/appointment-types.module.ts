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

import { AppointmentTypesService } from '@peakitpt/ui-kyrios-api';
import { AppointmentTypesRoutingModule } from './appointment-types-routing.module';
import { reducer } from './reducers/appointment-types.reducer';
import { AppointmentTypesListComponent } from './appointment-types-list/appointment-types-list.component';
import { AppointmentTypesEffects } from './reducers/appointment-types.effects';
import { AppointmentTypesSearchComponent } from './appointment-types-search/appointment-types-search.component';
import { AppointmentTypesDeleteComponent } from './appointment-types-delete/appointment-types-delete.component';
import { AppointmentTypesDetailsComponent } from './appointment-types-details/appointment-types-details.component';
import { AppointmentTypesFormComponent } from './appointment-types-form/appointment-types-form.component';

@NgModule({
  declarations: [
    AppointmentTypesListComponent,
    AppointmentTypesFormComponent,
    AppointmentTypesDetailsComponent,
    AppointmentTypesDeleteComponent,
    AppointmentTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('appointment-types', reducer),
    EffectsModule.forFeature([AppointmentTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    AppointmentTypesRoutingModule,
    ReportsModule,
  ],
  providers: [
    AppointmentTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class AppointmentTypesModule {}
