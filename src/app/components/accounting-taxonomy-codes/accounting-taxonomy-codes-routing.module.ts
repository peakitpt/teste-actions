import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingTaxonomyCodesListComponent } from './accounting-taxonomy-codes-list/accounting-taxonomy-codes-list.component';
import { AccountingTaxonomyCodesDetailsComponent } from './accounting-taxonomy-codes-details/accounting-taxonomy-codes-details.component';
import { AccountingTaxonomyCodesFormComponent } from './accounting-taxonomy-codes-form/accounting-taxonomy-codes-form.component';
import { AccountingTaxonomyCodesDeleteComponent } from './accounting-taxonomy-codes-delete/accounting-taxonomy-codes-delete.component';

// QUICK INSERTION
import { AccountingTaxonomyReferencesModalComponent } from 'src/app/shared/components/modals/accounting-taxonomy-references-modal/accounting-taxonomy-references-modal.component';

const formChildren: Routes = [
  {
    path: 'accounting-taxonomy-references-modal',
    component: AccountingTaxonomyReferencesModalComponent,
  },
  {
    path: 'delete',
    component: AccountingTaxonomyCodesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingTaxonomyCodesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingTaxonomyCode' },
    children: [
      {
        path: 'new',
        component: AccountingTaxonomyCodesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccountingTaxonomyCodesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccountingTaxonomyCodesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccountingTaxonomyCodesDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingTaxonomyCodesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingTaxonomyCodesRoutingModule {}
