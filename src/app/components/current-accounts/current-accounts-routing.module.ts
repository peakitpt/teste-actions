import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CurrentAccountsListComponent } from './current-accounts-list/current-accounts-list.component';
import { CurrentAccountsDetailsComponent } from './current-accounts-details/current-accounts-details.component';
import { CurrentAccountsFormComponent } from './current-accounts-form/current-accounts-form.component';
import { CurrentAccountsDeleteComponent } from './current-accounts-delete/current-accounts-delete.component';
import { CurrentAccountsReceiptsDetailsComponent } from './current-accounts-receipts-details/current-accounts-receipts-details.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CurrentAccountsDeleteComponent,
  },
  {
    path: 'current-accounts-receipts/:CARid',
    component: CurrentAccountsReceiptsDetailsComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: CurrentAccountsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CurrentAccount' },
    children: [
      {
        path: 'new',
        component: CurrentAccountsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: CurrentAccountsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: CurrentAccountsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: CurrentAccountsDeleteComponent,
      },
      {
        path: ':id/details',
        component: CurrentAccountsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentAccountsRoutingModule {}
