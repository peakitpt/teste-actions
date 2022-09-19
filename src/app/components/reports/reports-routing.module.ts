import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';
import { ReportsFormComponent } from './reports-form/reports-form.component';
import { ReportsDeleteComponent } from './reports-delete/reports-delete.component';
import { SubscriptionsModalComponent } from 'src/app/shared/components/modals/subscriptions-modal/subscriptions-modal.component';
import { ReportsPermissionsFormComponent } from './reports-permissions-form/reports-permissions-form.component';

const formChildren: Routes = [
  {
    path: 'subscriptions-modal',
    component: SubscriptionsModalComponent,
  },
  {
    path: 'delete',
    component: ReportsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: ReportsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'ReportsView' },
    children: [
      {
        path: 'new',
        component: ReportsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: ReportsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: ReportsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: ReportsDeleteComponent,
      },
      {
        path: ':id/details',
        component: ReportsDetailsComponent,
        children: formChildren,
      },
      {
        path: ':id/permissions',
        component: ReportsPermissionsFormComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
