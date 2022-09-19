import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { SuperUserGuard } from 'src/app/auth/super-user.guard';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { UsersModalComponent } from 'src/app/shared/components/modals/users-modal/users-modal.component';
import { SubscriptionsFormComponent } from './subscriptions-form/subscriptions-form.component';

import { SubscriptionsListComponent } from './subscriptions-list/subscriptions-list.component';

const formChildren: Routes = [
  {
    path: 'users-modal',
    component: UsersModalComponent,
  },
  {
    path: 'parishioners-modal',
    component: ParishionersModalComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsListComponent,
    canActivate: [PermissionGuard, SuperUserGuard],
    data: { view: 'Subscription' },
    children: [
      {
        path: 'new',
        component: SubscriptionsFormComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
