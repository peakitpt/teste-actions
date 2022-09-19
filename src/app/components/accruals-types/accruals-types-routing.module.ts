import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccrualsTypesListComponent } from './accruals-types-list/accruals-types-list.component';
import { AccrualsTypesDetailsComponent } from './accruals-types-details/accruals-types-details.component';
import { AccrualsTypesFormComponent } from './accruals-types-form/accruals-types-form.component';
import { AccrualsTypesDeleteComponent } from './accruals-types-delete/accruals-types-delete.component';

// QUICK INSERTION
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { DocumentsTypesModalComponent } from 'src/app/shared/components/modals/documents-types-modal/documents-types-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { AccrualTypesModalComponent } from 'src/app/shared/components/modals/accrual-types-modal/accrual-types-modal.component';

const formChildren: Routes = [
  {
    path: 'accrual-type-modal',
    component: AccrualTypesModalComponent,
  },
  {
    path: 'emoluments-modal',
    component: EmolumentsModalComponent,
  },
  {
    path: 'parishioners-modal',
    component: ParishionersModalComponent,
  },
  {
    path: 'documents-types-modal',
    component: DocumentsTypesModalComponent,
  },
  {
    path: 'delete',
    component: AccrualsTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccrualsTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccrualsType' },
    children: [
      {
        path: 'new',
        component: AccrualsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccrualsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccrualsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccrualsTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccrualsTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccrualsTypesRoutingModule {}
