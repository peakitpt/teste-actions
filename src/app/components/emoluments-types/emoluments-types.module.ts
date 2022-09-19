import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/emoluments-types.reducer';
import { EmolumentsTypesEffects } from './reducers/emoluments-types.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { EmolumentsTypesService } from '@peakitpt/ui-kyrios-api';
import { EmolumentsTypesRoutingModule } from './emoluments-types-routing.module';
import { EmolumentsTypesListComponent } from './emoluments-types-list/emoluments-types-list.component';
import { EmolumentsTypesDetailsComponent } from './emoluments-types-details/emoluments-types-details.component';
import { EmolumentsTypesFormComponent } from './emoluments-types-form/emoluments-types-form.component';
import { EmolumentsTypesDeleteComponent } from './emoluments-types-delete/emoluments-types-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { EmolumentsTypesSearchComponent } from './emoluments-types-search/emoluments-types-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    EmolumentsTypesListComponent,
    EmolumentsTypesDetailsComponent,
    EmolumentsTypesFormComponent,
    EmolumentsTypesDeleteComponent,
    EmolumentsTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('emoluments-types', reducer),
    EffectsModule.forFeature([EmolumentsTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    EmolumentsTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    EmolumentsTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [EmolumentsTypesFormComponent],
})
export class EmolumentsTypesModule {}
