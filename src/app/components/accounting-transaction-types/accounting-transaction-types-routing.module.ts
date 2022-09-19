import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingTransactionTypesListComponent } from './accounting-transaction-types-list/accounting-transaction-types-list.component';
import { AccountingTransactionTypesDetailsComponent } from './accounting-transaction-types-details/accounting-transaction-types-details.component';
import { AccountingTransactionTypesFormComponent } from './accounting-transaction-types-form/accounting-transaction-types-form.component';
import { AccountingTransactionTypesDeleteComponent } from './accounting-transaction-types-delete/accounting-transaction-types-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: AccountingTransactionTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingTransactionTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingTransactionType' },
    children: [
      {
        path: 'new',
        component: AccountingTransactionTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccountingTransactionTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccountingTransactionTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccountingTransactionTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingTransactionTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingTransactionTypesRoutingModule {}
