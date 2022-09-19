import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingJournalsListComponent } from './accounting-journals-list/accounting-journals-list.component';
import { AccountingJournalsDetailsComponent } from './accounting-journals-details/accounting-journals-details.component';
import { AccountingJournalsFormComponent } from './accounting-journals-form/accounting-journals-form.component';
import { AccountingJournalsDeleteComponent } from './accounting-journals-delete/accounting-journals-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: AccountingJournalsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingJournalsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingJournal' },
    children: [
      {
        path: 'new',
        component: AccountingJournalsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccountingJournalsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccountingJournalsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccountingJournalsDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingJournalsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingJournalsRoutingModule {}
