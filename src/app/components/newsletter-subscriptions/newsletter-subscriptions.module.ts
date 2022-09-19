import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/newsletter-subscriptions.reducer';
import { NewsletterSubscriptionsEffects } from './reducers/newsletter-subscriptions.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { NewsletterSubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { NewsletterSubscriptionsRoutingModule } from './newsletter-subscriptions-routing.module';
import { NewsletterSubscriptionsListComponent } from './newsletter-subscriptions-list/newsletter-subscriptions-list.component';
import { NewsletterSubscriptionsSearchComponent } from './newsletter-subscriptions-search/newsletter-subscriptions-search.component';
import { NewsletterSubscriptionsToggleConfirmationComponent } from './newsletter-subscriptions-list/newsletter-subscriptions-toggle-confirmation/newsletter-subscriptions-toggle-confirmation.component';

@NgModule({
  declarations: [
    NewsletterSubscriptionsListComponent,
    NewsletterSubscriptionsSearchComponent,
    NewsletterSubscriptionsToggleConfirmationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('newsletter-subscriptions', reducer),
    EffectsModule.forFeature([NewsletterSubscriptionsEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    MatCheckboxModule,
    NewsletterSubscriptionsRoutingModule,
  ],
  providers: [
    NewsletterSubscriptionsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class NewsletterSubscriptionsModule {}
