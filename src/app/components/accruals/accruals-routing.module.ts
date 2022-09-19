import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccrualsListComponent } from './accruals-list/accruals-list.component';
import { AccrualsDetailsComponent } from './accruals-details/accruals-details.component';
import { AccrualsFormComponent } from './accruals-form/accruals-form.component';
import { AccrualsDeleteComponent } from './accruals-delete/accruals-delete.component';

// QUICK INSERTION
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { DocumentsTypesModalComponent } from 'src/app/shared/components/modals/documents-types-modal/documents-types-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { AccrualTypesModalComponent } from 'src/app/shared/components/modals/accrual-types-modal/accrual-types-modal.component';

const formChildren: Routes = [
  {
    path: 'accrual-types-modal',
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
    component: AccrualsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AccrualsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccrualsAccrual' },
    children: [
      {
        path: 'new',
        component: AccrualsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AccrualsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AccrualsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AccrualsDeleteComponent,
      },
      {
        path: ':id/details',
        component: AccrualsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccrualsRoutingModule {}
