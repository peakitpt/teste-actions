import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingTaxonomyReferencesListComponent } from './accounting-taxonomy-references-list/accounting-taxonomy-references-list.component';
import { AccountingTaxonomyReferencesDetailsComponent } from './accounting-taxonomy-references-details/accounting-taxonomy-references-details.component';
import { AccountingTaxonomyReferencesFormComponent } from './accounting-taxonomy-references-form/accounting-taxonomy-references-form.component';
import { AccountingTaxonomyReferencesDeleteComponent } from './accounting-taxonomy-references-delete/accounting-taxonomy-references-delete.component';

// QUICK INSERTION
import { AccountingTaxonomyReferencesModalComponent } from 'src/app/shared/components/modals/accounting-taxonomy-references-modal/accounting-taxonomy-references-modal.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: AccountingTaxonomyReferencesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingTaxonomyReferencesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingTaxonomyReference' },
    children: [
      {
        path: 'new',
        component: AccountingTaxonomyReferencesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccountingTaxonomyReferencesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccountingTaxonomyReferencesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccountingTaxonomyReferencesDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingTaxonomyReferencesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingTaxonomyReferencesRoutingModule {}
