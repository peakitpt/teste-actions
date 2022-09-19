import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccountingExercisesListComponent } from './accounting-exercises-list/accounting-exercises-list.component';
import { AccountingExercisesDetailsComponent } from './accounting-exercises-details/accounting-exercises-details.component';
import { AccountingExercisesFormComponent } from './accounting-exercises-form/accounting-exercises-form.component';
import { AccountingExercisesDeleteComponent } from './accounting-exercises-delete/accounting-exercises-delete.component';

// QUICK INSERTION
import { AccountingTaxonomyReferencesModalComponent } from 'src/app/shared/components/modals/accounting-taxonomy-references-modal/accounting-taxonomy-references-modal.component';

const formChildren: Routes = [
  {
    path: 'accounting-taxonomy-references-modal',
    component: AccountingTaxonomyReferencesModalComponent,
  },
  {
    path: 'delete',
    component: AccountingExercisesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccountingExercisesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccountingExercise' },
    children: [
      {
        path: 'new',
        component: AccountingExercisesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccountingExercisesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccountingExercisesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccountingExercisesDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccountingExercisesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingExercisesRoutingModule {}
