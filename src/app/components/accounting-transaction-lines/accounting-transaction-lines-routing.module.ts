import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingTransactionLinesListComponent } from './accounting-transaction-lines-list/accounting-transaction-lines-list.component';
import { AccountingChartAccountsModalComponent } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/accounting-chart-accounts-modal.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: AccountingTransactionLinesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingTransactionLine' },
    children: [
      {
        path: 'accounting-chart-accounts-modal',
        component: AccountingChartAccountsModalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingTransactionLinesRoutingModule {}
