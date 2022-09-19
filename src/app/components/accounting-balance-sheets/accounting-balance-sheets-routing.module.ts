import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingBalanceSheetsListComponent } from './accounting-balance-sheets-list/accounting-balance-sheets-list.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: AccountingBalanceSheetsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingBalanceSheet' },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingBalanceSheetsRoutingModule {}
