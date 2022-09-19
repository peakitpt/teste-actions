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
import { ReadersService } from '@peakitpt/ui-kyrios-api';
import { ReadersRoutingModule } from './readers-routing.module';
import { reducer } from './reducers/readers.reducer';
import { ReadersEffects } from './reducers/readers.effects';
import { reducer as formations_modal_reducer } from '../../shared/components/modals/formations-modal/reducers/formations-modal.reducer';
import { FormationsModalEffects } from '../../shared/components/modals/formations-modal/reducers/formations-modal.effects';
import { reducer as chapelries_modal_reducer } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { ChapelriesModalEffects } from '../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.effects';
import { reducer as worshipplaces_modal_reducer } from '../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { WorshipplacesModalEffects } from '../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.effects';
import { ReadersListComponent } from './readers-list/readers-list.component';
import { ReadersFormComponent } from './readers-form/readers-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ReadersDetailsComponent } from './readers-details/readers-details.component';
import { ReadersDeleteComponent } from './readers-delete/readers-delete.component';
import { ReadersSearchComponent } from './readers-search/readers-search.component';
import { ReportsModule } from '../reports/reports.module';

@NgModule({
  declarations: [
    ReadersListComponent,
    ReadersFormComponent,
    ReadersDetailsComponent,
    ReadersDeleteComponent,
    ReadersSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('readers', reducer),
    EffectsModule.forFeature([ReadersEffects]),
    StoreModule.forFeature('formations-modal', formations_modal_reducer),
    EffectsModule.forFeature([FormationsModalEffects]),
    StoreModule.forFeature('chapelries-modal', chapelries_modal_reducer),
    EffectsModule.forFeature([ChapelriesModalEffects]),
    StoreModule.forFeature('worshipplaces-modal', worshipplaces_modal_reducer),
    EffectsModule.forFeature([WorshipplacesModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ReadersRoutingModule,
    MatCheckboxModule,
    ReportsModule,
  ],
  providers: [
    ReadersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class ReadersModule {}
