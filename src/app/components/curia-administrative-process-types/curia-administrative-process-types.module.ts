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

import { CuriaAdministrativeProcessTypesService } from '@peakitpt/ui-kyrios-api';
import { CuriaAdministrativeProcessTypesRoutingModule } from './curia-administrative-process-types-routing.module';
import { reducer } from './reducers/curia-administrative-process-types.reducer';
import { CuriaAdministrativeProcessTypesListComponent } from './curia-administrative-process-types-list/curia-administrative-process-types-list.component';
import { CuriaAdministrativeProcessTypesEffects } from './reducers/curia-administrative-process-types.effects';
import { CuriaAdministrativeProcessTypesSearchComponent } from './curia-administrative-process-types-search/curia-administrative-process-types-search.component';
import { CuriaAdministrativeProcessTypesDeleteComponent } from './curia-administrative-process-types-delete/curia-administrative-process-types-delete.component';
import { CuriaAdministrativeProcessTypesDetailsComponent } from './curia-administrative-process-types-details/curia-administrative-process-types-details.component';
import { CuriaAdministrativeProcessTypesFormComponent } from './curia-administrative-process-types-form/curia-administrative-process-types-form.component';

@NgModule({
  declarations: [
    CuriaAdministrativeProcessTypesListComponent,
    CuriaAdministrativeProcessTypesFormComponent,
    CuriaAdministrativeProcessTypesDetailsComponent,
    CuriaAdministrativeProcessTypesDeleteComponent,
    CuriaAdministrativeProcessTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-administrative-process-types', reducer),
    EffectsModule.forFeature([CuriaAdministrativeProcessTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    CuriaAdministrativeProcessTypesRoutingModule,
    ReportsModule,
  ],
  providers: [
    CuriaAdministrativeProcessTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class CuriaAdministrativeProcessTypesModule {}
