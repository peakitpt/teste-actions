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

import { reducer } from './reducers/newsletters-layouts.reducer';
import { NewslettersLayoutsService } from '@peakitpt/ui-kyrios-api';
import { NewslettersLayoutsEffects } from './reducers/newsletters-layouts.effects';
import { NewslettersLayoutsRoutingModule } from './newsletters-layouts-routing.module';
import { NewslettersLayoutsListComponent } from './newsletters-layouts-list/newsletters-layouts-list.component';
import { NewslettersLayoutsSearchComponent } from './newsletters-layouts-search/newsletters-layouts-search.component';
import { NewslettersLayoutsDeleteComponent } from './newsletters-layouts-delete/newsletters-layouts-delete.component';
import { NewslettersLayoutsDetailsComponent } from './newsletters-layouts-details/newsletters-layouts-details.component';
import { NewslettersLayoutsFormComponent } from './newsletters-layouts-form/newsletters-layouts-form.component';

@NgModule({
  declarations: [
    NewslettersLayoutsListComponent,
    NewslettersLayoutsSearchComponent,
    NewslettersLayoutsDeleteComponent,
    NewslettersLayoutsDetailsComponent,
    NewslettersLayoutsFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('newsletters-layouts', reducer),
    EffectsModule.forFeature([NewslettersLayoutsEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    NewslettersLayoutsRoutingModule,
    ReportsModule,
  ],
  providers: [
    NewslettersLayoutsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class NewslettersLayoutsModule {}
