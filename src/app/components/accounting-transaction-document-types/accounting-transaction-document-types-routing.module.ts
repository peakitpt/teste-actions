import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingTransactionDocumentTypesListComponent } from './accounting-transaction-document-types-list/accounting-transaction-document-types-list.component';
import { AccountingTransactionDocumentTypesDetailsComponent } from './accounting-transaction-document-types-details/accounting-transaction-document-types-details.component';
import { AccountingTransactionDocumentTypesFormComponent } from './accounting-transaction-document-types-form/accounting-transaction-document-types-form.component';
import { AccountingTransactionDocumentTypesDeleteComponent } from './accounting-transaction-document-types-delete/accounting-transaction-document-types-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: AccountingTransactionDocumentTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingTransactionDocumentTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingTransactionDocumentType' },
    children: [
      {
        path: 'new',
        component: AccountingTransactionDocumentTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccountingTransactionDocumentTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccountingTransactionDocumentTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccountingTransactionDocumentTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingTransactionDocumentTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingTransactionDocumentTypesRoutingModule {}
