import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingCostCentersListComponent } from './accounting-cost-centers-list/accounting-cost-centers-list.component';
import { AccountingCostCentersDetailsComponent } from './accounting-cost-centers-details/accounting-cost-centers-details.component';
import { AccountingCostCentersFormComponent } from './accounting-cost-centers-form/accounting-cost-centers-form.component';
import { AccountingCostCentersDeleteComponent } from './accounting-cost-centers-delete/accounting-cost-centers-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: AccountingCostCentersDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingCostCentersListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingCostCenter' },
    children: [
      {
        path: 'new',
        component: AccountingCostCentersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccountingCostCentersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccountingCostCentersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccountingCostCentersDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingCostCentersDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingCostCentersRoutingModule {}
