import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { NewsletterGroupSubscriptionsListComponent } from './newsletter-group-subscriptions-list/newsletter-group-subscriptions-list.component';
import { NewsletterGroupSubscriptionsFormComponent } from './newsletter-group-subscriptions-form/newsletter-group-subscriptions-form.component';
import { NewsletterSubscriptionsModalComponent } from 'src/app/shared/components/modals/newsletter-subscriptions-modal/newsletter-subscriptions-modal.component';

const formChildren: Routes = [
  {
    path: 'newsletter-subscriptions-modal',
    component: NewsletterSubscriptionsModalComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: NewsletterGroupSubscriptionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'NewsletterGroupSubscription' },
    children: [
      {
        path: 'new',
        component: NewsletterGroupSubscriptionsFormComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsletterGroupSubscriptionsRoutingModule {}
