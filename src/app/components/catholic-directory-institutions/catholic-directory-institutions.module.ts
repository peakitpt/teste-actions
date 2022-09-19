import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/catholic-directory-institutions.reducer';
import { CatholicDirectoryInstitutionsEffects } from './reducers/catholic-directory-institutions.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { ReportsModule } from '../reports/reports.module';

import { CatholicDirectoryInstitutionsService } from '@peakitpt/ui-kyrios-api';
import { CatholicDirectoryInstitutionsRoutingModule } from './catholic-directory-institutions-routing.module';
import { CatholicDirectoryInstitutionsListComponent } from './catholic-directory-institutions-list/catholic-directory-institutions-list.component';
import { CatholicDirectoryInstitutionsDetailsComponent } from './catholic-directory-institutions-details/catholic-directory-institutions-details.component';
import { SubscriptionSettingsModule } from '../subscription-settings/subscription-settings.module';
import { CatholicDirectoryInstitutionsSearchComponent } from './catholic-directory-institutions-search/catholic-directory-institutions-search.component';

@NgModule({
  declarations: [
    CatholicDirectoryInstitutionsListComponent,
    CatholicDirectoryInstitutionsDetailsComponent,
    CatholicDirectoryInstitutionsSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('catholic-directory-institutions', reducer),
    EffectsModule.forFeature([CatholicDirectoryInstitutionsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    CatholicDirectoryInstitutionsRoutingModule,
    SubscriptionSettingsModule,
    ReportsModule,
  ],
  providers: [
    CatholicDirectoryInstitutionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class CatholicDirectoryInstitutionsModule {}
