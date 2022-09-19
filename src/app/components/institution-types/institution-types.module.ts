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
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';
import { InstitutionTypesRoutingModule } from './institution-types-routing.module';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { InstitutionTypesEffects } from './reducers/institution-types.effects';
import { reducer } from './reducers/institution-types.reducer';
import { InstitutionTypesDeleteComponent } from './institution-types-delete/institution-types-delete.component';
import { InstitutionTypesDetailsComponent } from './institution-types-details/institution-types-details.component';
import { InstitutionTypesFormComponent } from './institution-types-form/institution-types-form.component';
import { InstitutionTypesListComponent } from './institution-types-list/institution-types-list.component';
import { InstitutionTypesService } from '@peakitpt/ui-kyrios-api';
import {InstitutionTypesSearchComponent} from './institution-types-search/institution-types-search.component';


@NgModule({
  declarations: [
    InstitutionTypesDeleteComponent,
    InstitutionTypesDetailsComponent,
    InstitutionTypesFormComponent,
    InstitutionTypesListComponent,
    InstitutionTypesSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    StoreModule.forFeature('institution-types', reducer),
    EffectsModule.forFeature([InstitutionTypesEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    InstitutionTypesRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    InstitutionTypesService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class InstitutionTypesModule {}
