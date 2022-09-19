import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/emoluments.reducer';
import { EmolumentsEffects } from './reducers/emoluments.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { EmolumentsService } from '@peakitpt/ui-kyrios-api';
import { EmolumentsRoutingModule } from './emoluments-routing.module';
import { EmolumentsListComponent } from './emoluments-list/emoluments-list.component';
import { EmolumentsDetailsComponent } from './emoluments-details/emoluments-details.component';
import { EmolumentsFormComponent } from './emoluments-form/emoluments-form.component';
import { EmolumentsDeleteComponent } from './emoluments-delete/emoluments-delete.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { EmolumentsSearchComponent } from './emoluments-search/emoluments-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    EmolumentsListComponent,
    EmolumentsDetailsComponent,
    EmolumentsFormComponent,
    EmolumentsDeleteComponent,
    EmolumentsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('emoluments', reducer),
    EffectsModule.forFeature([EmolumentsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    EmolumentsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    EmolumentsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [EmolumentsFormComponent],
})
export class EmolumentsModule {}
