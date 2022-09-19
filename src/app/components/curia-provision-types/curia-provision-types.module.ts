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

import { CuriaProvisionTypesService } from '@peakitpt/ui-kyrios-api';
import { CuriaProvisionTypesRoutingModule } from './curia-provision-types-routing.module';
import { reducer } from './reducers/curia-provision-types.reducer';
import { CuriaProvisionTypesListComponent } from './curia-provision-types-list/curia-provision-types-list.component';
import { CuriaProvisionTypesEffects } from './reducers/curia-provision-types.effects';
import { CuriaProvisionTypesSearchComponent } from './curia-provision-types-search/curia-provision-types-search.component';
import { CuriaProvisionTypesDeleteComponent } from './curia-provision-types-delete/curia-provision-types-delete.component';
import { CuriaProvisionTypesDetailsComponent } from './curia-provision-types-details/curia-provision-types-details.component';
import { CuriaProvisionTypesFormComponent } from './curia-provision-types-form/curia-provision-types-form.component';

@NgModule({
  declarations: [
    CuriaProvisionTypesListComponent,
    CuriaProvisionTypesFormComponent,
    CuriaProvisionTypesDetailsComponent,
    CuriaProvisionTypesDeleteComponent,
    CuriaProvisionTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-provision-types', reducer),
    EffectsModule.forFeature([CuriaProvisionTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    CuriaProvisionTypesRoutingModule,
    ReportsModule,
  ],
  providers: [
    CuriaProvisionTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class CuriaProvisionTypesModule {}
