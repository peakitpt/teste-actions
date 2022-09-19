import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingTransactionsListComponent } from './accounting-transactions-list/accounting-transactions-list.component';
import { AccountingTransactionsDetailsComponent } from './accounting-transactions-details/accounting-transactions-details.component';
import { AccountingTransactionsFormComponent } from './accounting-transactions-form/accounting-transactions-form.component';
import { AccountingTransactionsDeleteComponent } from './accounting-transactions-delete/accounting-transactions-delete.component';

// QUICK INSERTION
import { AccountingTransactionDocumentTypesModalComponent } from 'src/app/shared/components/modals/accounting-transaction-document-types-modal/accounting-transaction-document-types-modal.component';
import { AccountingJournalsModalComponent } from 'src/app/shared/components/modals/accounting-journals-modal/accounting-journals-modal.component';
import { AccountingChartAccountsModalComponent } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/accounting-chart-accounts-modal.component';
import { AccountingCostCentersModalComponent } from 'src/app/shared/components/modals/accounting-cost-centers-modal/accounting-cost-centers-modal.component';
import { AccountingTransactionDocumentTypesFormComponent } from '../accounting-transaction-document-types/accounting-transaction-document-types-form/accounting-transaction-document-types-form.component';
import { AccountingJournalsFormComponent } from '../accounting-journals/accounting-journals-form/accounting-journals-form.component';
import { AccountingChartAccountsFormComponent } from '../accounting-chart-accounts/accounting-chart-accounts-form/accounting-chart-accounts-form.component';
import { AccountingCostCentersFormComponent } from '../accounting-cost-centers/accounting-cost-centers-form/accounting-cost-centers-form.component';
import { AccountingTaxonomyCodesModalComponent } from 'src/app/shared/components/modals/accounting-taxonomy-codes-modal/accounting-taxonomy-codes-modal.component';

const formChildren: Routes = [
  {
    path: 'accounting-transaction-document-types-modal',
    component: AccountingTransactionDocumentTypesModalComponent,
  },
  {
    path: 'accounting-journals-modal',
    component: AccountingJournalsModalComponent,
  },
  {
    path: 'accounting-chart-accounts-modal',
    component: AccountingChartAccountsModalComponent,
  },
  {
    path: 'accounting-cost-centers-modal',
    component: AccountingCostCentersModalComponent,
  },
  {
    path: 'delete',
    component: AccountingTransactionsDeleteComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-accounting-transaction-document-types-modal',
    component: AccountingTransactionDocumentTypesFormComponent,
  },
  {
    path: 'quick-insert-accounting-journals-modal',
    component: AccountingJournalsFormComponent,
  },
  {
    path: 'quick-insert-accounting-chart-accounts-modal',
    component: AccountingChartAccountsFormComponent,
    children: [
      {
        path: 'accounting-chart-accounts-modal',
        component: AccountingChartAccountsModalComponent,
      },
      {
        path: 'accounting-taxonomy-codes-modal',
        component: AccountingTaxonomyCodesModalComponent,
      },
    ],
  },
  {
    path: 'quick-insert-accounting-cost-centers-modal',
    component: AccountingCostCentersFormComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingTransactionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingTransaction' },
    children: [
      {
        path: 'accounting-transaction-document-types-modal',
        component: AccountingTransactionDocumentTypesModalComponent,
      },
      {
        path: 'accounting-journals-modal',
        component: AccountingJournalsModalComponent,
      },
      {
        path: 'new',
        component: AccountingTransactionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: AccountingTransactionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: AccountingTransactionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: AccountingTransactionsDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingTransactionsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingTransactionsRoutingModule {}
