import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { SubscriptionUsersListComponent } from './subscription-users-list/subscription-users-list.component';
import { SubscriptionUsersDetailsComponent } from './subscription-users-details/subscription-users-details.component';
import { SubscriptionUsersFormComponent } from './subscription-users-form/subscription-users-form.component';
import { SubscriptionUsersDeleteComponent } from './subscription-users-delete/subscription-users-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: SubscriptionUsersDeleteComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: SubscriptionUsersListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'SubscriptionUser' },
    children: [
      {
        path: 'new',
        component: SubscriptionUsersFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: SubscriptionUsersFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: SubscriptionUsersFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: SubscriptionUsersDeleteComponent
      },
      {
        path: ':id/details',
        component: SubscriptionUsersDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionUsersRoutingModule {}
