import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { NewsletterSubscriptionsListComponent } from './newsletter-subscriptions-list/newsletter-subscriptions-list.component';

const routes: Routes = [
  {
    path: '',
    component: NewsletterSubscriptionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'NewsletterSubscription' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsletterSubscriptionsRoutingModule {}
