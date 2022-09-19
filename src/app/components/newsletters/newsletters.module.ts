import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/newsletters.reducer';
import { NewslettersEffects } from './reducers/newsletters.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { NewslettersService } from '@peakitpt/ui-kyrios-api';
import { NewslettersRoutingModule } from './newsletters-routing.module';
import { NewslettersListComponent } from './newsletters-list/newsletters-list.component';
import { NewslettersSearchComponent } from './newsletters-search/newsletters-search.component';
import { NewslettersDeleteComponent } from './newsletters-delete/newsletters-delete.component';
import { NewslettersDetailsComponent } from './newsletters-details/newsletters-details.component';
import { NewslettersFormComponent } from './newsletters-form/newsletters-form.component';
import { NewslettersSendTestComponent } from './newsletters-send-test/newsletters-send-test.component';

// Quick insertions
import { GroupsModule } from '../groups/groups.module';
import { NewslettersLayoutsModule } from '../newsletters-layouts/newsletters-layouts.module';

@NgModule({
  declarations: [
    NewslettersListComponent,
    NewslettersSearchComponent,
    NewslettersDeleteComponent,
    NewslettersDetailsComponent,
    NewslettersFormComponent,
    NewslettersSendTestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('newsletters', reducer),
    EffectsModule.forFeature([NewslettersEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    NewslettersRoutingModule,

    GroupsModule,
    NewslettersLayoutsModule,
  ],
  providers: [
    NewslettersService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class NewslettersModule {}
