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
import { PatronsService } from '@peakitpt/ui-kyrios-api';
import { PatronsRoutingModule } from './patrons-routing.module';
import { reducer } from './reducers/patrons.reducer';
import { PatronsEffects } from './reducers/patrons.effects';
import { PatronsListComponent } from './patrons-list/patrons-list.component';
import { PatronsFormComponent } from './patrons-form/patrons-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PatronsDetailsComponent } from './patrons-details/patrons-details.component';
import { PatronsDeleteComponent } from './patrons-delete/patrons-delete.component';
import { PatronsSearchComponent } from './patrons-search/patrons-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    PatronsListComponent,
    PatronsFormComponent,
    PatronsDetailsComponent,
    PatronsDeleteComponent,
    PatronsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('patrons', reducer),
    EffectsModule.forFeature([PatronsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    PatronsRoutingModule,
    MatCheckboxModule,
    ReportsModule,
  ],
  providers: [
    PatronsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class PatronsModule {}
