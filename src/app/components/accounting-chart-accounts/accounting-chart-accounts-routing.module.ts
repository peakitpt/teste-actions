import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingChartAccountsListComponent } from './accounting-chart-accounts-list/accounting-chart-accounts-list.component';
import { AccountingChartAccountsDetailsComponent } from './accounting-chart-accounts-details/accounting-chart-accounts-details.component';
import { AccountingChartAccountsFormComponent } from './accounting-chart-accounts-form/accounting-chart-accounts-form.component';
import { AccountingChartAccountsDeleteComponent } from './accounting-chart-accounts-delete/accounting-chart-accounts-delete.component';

// QUICK INSERTION
import { AccountingChartAccountsModalComponent } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/accounting-chart-accounts-modal.component';
import { AccountingTaxonomyCodesModalComponent } from 'src/app/shared/components/modals/accounting-taxonomy-codes-modal/accounting-taxonomy-codes-modal.component';

const formChildren: Routes = [
  {
    path: 'accounting-chart-accounts-modal',
    component: AccountingChartAccountsModalComponent,
  },
  {
    path: 'accounting-taxonomy-codes-modal',
    component: AccountingTaxonomyCodesModalComponent,
  },
  {
    path: 'delete',
    component: AccountingChartAccountsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingChartAccountsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingChartAccount' },
    children: [
      {
        path: 'new',
        component: AccountingChartAccountsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccountingChartAccountsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccountingChartAccountsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccountingChartAccountsDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingChartAccountsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingChartAccountsRoutingModule {}
