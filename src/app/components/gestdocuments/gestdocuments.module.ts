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

import { GestdocumentsService } from '@peakitpt/ui-kyrios-api';
import { GestdocumentsRoutingModule } from './gestdocuments-routing.module';
import { GestdocumentsListComponent } from './gestdocuments-list/gestdocuments-list.component';
import { GestdocumentsSearchComponent } from './gestdocuments-search/gestdocuments-search.component';
import { GestdocumentsDeleteComponent } from './gestdocuments-delete/gestdocuments-delete.component';
import { GestdocumentsDetailsComponent } from './gestdocuments-details/gestdocuments-details.component';
import { GestdocumentsFormComponent } from './gestdocuments-form/gestdocuments-form.component';

import { reducer } from './reducers/gestdocuments.reducer';
import { GestdocumentsEffects } from './reducers/gestdocuments.effects';

@NgModule({
  declarations: [
    GestdocumentsListComponent,
    GestdocumentsFormComponent,
    GestdocumentsDetailsComponent,
    GestdocumentsDeleteComponent,
    GestdocumentsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('gestdocuments', reducer),
    EffectsModule.forFeature([GestdocumentsEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    GestdocumentsRoutingModule,
    ReportsModule,
  ],
  providers: [
    GestdocumentsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class GestdocumentsModule {}
