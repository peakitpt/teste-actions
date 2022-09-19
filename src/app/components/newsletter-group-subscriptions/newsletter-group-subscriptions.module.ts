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

import { NewsletterGroupSubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { reducer } from './reducers/newsletter-group-subscriptions.reducer';
import { NewsletterGroupSubscriptionsEffects } from './reducers/newsletter-group-subscriptions.effects';
import { NewsletterGroupSubscriptionsRoutingModule } from './newsletter-group-subscriptions-routing.module';
import { NewsletterGroupSubscriptionsListComponent } from './newsletter-group-subscriptions-list/newsletter-group-subscriptions-list.component';
import { NewsletterGroupSubscriptionsSearchComponent } from './newsletter-group-subscriptions-search/newsletter-group-subscriptions-search.component';
import { NewsletterGroupSubscriptionsToggleConfirmationComponent } from './newsletter-group-subscriptions-list/newsletter-group-subscriptions-toggle-confirmation/newsletter-group-subscriptions-toggle-confirmation.component';
import { NewsletterGroupSubscriptionsFormComponent } from './newsletter-group-subscriptions-form/newsletter-group-subscriptions-form.component';

import { reducer as NewsletterSubscriptionsModalReducer } from '../../shared/components/modals/newsletter-subscriptions-modal/reducers/newsletter-subscriptions-modal.reducer';
import { NewsletterSubscriptionsModalEffects } from '../../shared/components/modals/newsletter-subscriptions-modal/reducers/newsletter-subscriptions-modal.effects';

// Quick insertions
import { GroupsModule } from '../groups/groups.module';

@NgModule({
  declarations: [
    NewsletterGroupSubscriptionsListComponent,
    NewsletterGroupSubscriptionsSearchComponent,
    NewsletterGroupSubscriptionsToggleConfirmationComponent,
    NewsletterGroupSubscriptionsFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('newsletter-group-subscriptions', reducer),
    EffectsModule.forFeature([NewsletterGroupSubscriptionsEffects]),

    StoreModule.forFeature(
      'newsletter-subscriptions-modal',
      NewsletterSubscriptionsModalReducer
    ),
    EffectsModule.forFeature([NewsletterSubscriptionsModalEffects]),

    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    NewsletterGroupSubscriptionsRoutingModule,

    GroupsModule,
  ],
  providers: [
    NewsletterGroupSubscriptionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class NewsletterGroupSubscriptionsModule {}
