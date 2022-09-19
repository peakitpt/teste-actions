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

import { MassIntentionsTypesService } from '@peakitpt/ui-kyrios-api';
import { MassIntentionsTypesRoutingModule } from './mass-intentions-types-routing.module';
import { reducer } from './reducers/mass-intentions-types.reducer';
import { MassIntentionsTypesListComponent } from './mass-intentions-types-list/mass-intentions-types-list.component';
import { MassIntentionsTypesEffects } from './reducers/mass-intentions-types.effects';
import { MassIntentionsTypesSearchComponent } from './mass-intentions-types-search/mass-intentions-types-search.component';
import { MassIntentionsTypesDeleteComponent } from './mass-intentions-types-delete/mass-intentions-types-delete.component';
import { MassIntentionsTypesDetailsComponent } from './mass-intentions-types-details/mass-intentions-types-details.component';
import { MassIntentionsTypesFormComponent } from './mass-intentions-types-form/mass-intentions-types-form.component';

@NgModule({
  declarations: [
    MassIntentionsTypesListComponent,
    MassIntentionsTypesFormComponent,
    MassIntentionsTypesDetailsComponent,
    MassIntentionsTypesDeleteComponent,
    MassIntentionsTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('mass-intentions-types', reducer),
    EffectsModule.forFeature([MassIntentionsTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    MassIntentionsTypesRoutingModule,
    ReportsModule,
  ],
  providers: [
    MassIntentionsTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [],
})
export class MassIntentionsTypesModule {}
