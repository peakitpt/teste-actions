import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/clergy-types.reducer';
import { ClergyTypesEffects } from './reducers/clergy-types.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { ClergyTypesService } from '@peakitpt/ui-kyrios-api';
import { ClergyTypesRoutingModule } from './clergy-types-routing.module';
import { ClergyTypesListComponent } from './clergy-types-list/clergy-types-list.component';
import { ClergyTypesDetailsComponent } from './clergy-types-details/clergy-types-details.component';
import { ClergyTypesFormComponent } from './clergy-types-form/clergy-types-form.component';
import { ClergyTypesDeleteComponent } from './clergy-types-delete/clergy-types-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { ClergyTypesSearchComponent } from './clergy-types-search/clergy-types-search.component';

@NgModule({
  declarations: [
    ClergyTypesListComponent,
    ClergyTypesDetailsComponent,
    ClergyTypesFormComponent,
    ClergyTypesDeleteComponent,
    ClergyTypesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('clergy-types', reducer),
    EffectsModule.forFeature([ClergyTypesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ClergyTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    ClergyTypesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class ClergyTypesModule {}
