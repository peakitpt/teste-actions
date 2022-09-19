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

import { CuriaSecretariatTypesService } from '@peakitpt/ui-kyrios-api';
import { CuriaSecretariatTypesRoutingModule } from './curia-secretariat-types-routing.module';
import { reducer } from './reducers/curia-secretariat-types.reducer';
import { CuriaSecretariatTypesListComponent } from './curia-secretariat-types-list/curia-secretariat-types-list.component';
import { CuriaSecretariatTypesEffects } from './reducers/curia-secretariat-types.effects';
import { CuriaSecretariatTypesSearchComponent } from './curia-secretariat-types-search/curia-secretariat-types-search.component';
import { CuriaSecretariatTypesDeleteComponent } from './curia-secretariat-types-delete/curia-secretariat-types-delete.component';
import { CuriaSecretariatTypesDetailsComponent } from './curia-secretariat-types-details/curia-secretariat-types-details.component';
import { CuriaSecretariatTypesFormComponent } from './curia-secretariat-types-form/curia-secretariat-types-form.component';

@NgModule({
  declarations: [
    CuriaSecretariatTypesListComponent,
    CuriaSecretariatTypesFormComponent,
    CuriaSecretariatTypesDetailsComponent,
    CuriaSecretariatTypesDeleteComponent,
    CuriaSecretariatTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('curia-secretariat-types', reducer),
    EffectsModule.forFeature([CuriaSecretariatTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    CuriaSecretariatTypesRoutingModule,
    ReportsModule,
  ],
  providers: [
    CuriaSecretariatTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class CuriaSecretariatTypesModule {}
