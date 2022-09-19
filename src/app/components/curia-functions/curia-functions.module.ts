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

import { CuriaFunctionsService } from '@peakitpt/ui-kyrios-api';
import { CuriaFunctionsRoutingModule } from './curia-functions-routing.module';
import { CuriaFunctionsListComponent } from './curia-functions-list/curia-functions-list.component';
import { CuriaFunctionsSearchComponent } from './curia-functions-search/curia-functions-search.component';
import { CuriaFunctionsDeleteComponent } from './curia-functions-delete/curia-functions-delete.component';
import { CuriaFunctionsDetailsComponent } from './curia-functions-details/curia-functions-details.component';
import { CuriaFunctionsFormComponent } from './curia-functions-form/curia-functions-form.component';

import { reducer } from './reducers/curia-functions.reducer';
import { CuriaFunctionsEffects } from './reducers/curia-functions.effects';
import { reducer as AppointmentTypesModalReducer } from 'src/app/shared/components/modals/appointment-types-modal/reducers/appointment-types-modal.reducer';
import { AppointmentTypesModalEffects } from 'src/app/shared/components/modals/appointment-types-modal/reducers/appointment-types-modal.effects';

// Quick Insertion
import { AppointmentTypesModule } from '../appointment-types/appointment-types.module';

@NgModule({
  declarations: [
    CuriaFunctionsListComponent,
    CuriaFunctionsFormComponent,
    CuriaFunctionsDetailsComponent,
    CuriaFunctionsDeleteComponent,
    CuriaFunctionsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-functions', reducer),
    EffectsModule.forFeature([CuriaFunctionsEffects]),

    StoreModule.forFeature(
      'appointment-types-modal',
      AppointmentTypesModalReducer
    ),
    EffectsModule.forFeature([AppointmentTypesModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    CuriaFunctionsRoutingModule,
    ReportsModule,
    AppointmentTypesModule,
  ],
  providers: [
    CuriaFunctionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class CuriaFunctionsModule {}
