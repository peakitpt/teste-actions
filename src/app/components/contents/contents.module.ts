import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/contents.reducer';
import { reducer as sectionsReducer } from '../sections/reducers/sections.reducer';
import { SectionsEffects } from '../sections/reducers/sections.effects';
import { reducer as contentsModalReducer } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.reducer';
import { ContentsModalEffects } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.effects';
import { ContentsEffects } from './reducers/contents.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';

import { ContentsService } from '@peakitpt/ui-kyrios-api';
import { ContentsRoutingModule } from './contents-routing.module';
import { ReportsModule } from '../reports/reports.module';
import { ContentsListComponent } from './contents-list/contents-list.component';
import { ContentsDetailsComponent } from './contents-details/contents-details.component';
import { ContentsFormComponent } from './contents-form/contents-form.component';
import { ContentsDeleteComponent } from './contents-delete/contents-delete.component';
import { ContentsSearchComponent } from './contents-search/contents-search.component';

@NgModule({
  declarations: [
    ContentsListComponent,
    ContentsDetailsComponent,
    ContentsFormComponent,
    ContentsDeleteComponent,
    ContentsSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('contents', reducer),
    EffectsModule.forFeature([ContentsEffects]),
    StoreModule.forFeature('sections', sectionsReducer),
    EffectsModule.forFeature([SectionsEffects]),
    StoreModule.forFeature('contents-modal', contentsModalReducer),
    EffectsModule.forFeature([ContentsModalEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    ContentsRoutingModule,
    ReportsModule
  ],
  providers: [
    ContentsService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  exports: [
    ContentsFormComponent
  ]
})
export class ContentsModule {}
