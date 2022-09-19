import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { DocumentsTypesListComponent } from './documents-types-list/documents-types-list.component';
import { DocumentsTypesDetailsComponent } from './documents-types-details/documents-types-details.component';
import { DocumentsTypesFormComponent } from './documents-types-form/documents-types-form.component';
import { DocumentsTypesDeleteComponent } from './documents-types-delete/documents-types-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: DocumentsTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: DocumentsTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'DocumentsType' },
    children: [
      {
        path: 'new',
        component: DocumentsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: DocumentsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: DocumentsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: DocumentsTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: DocumentsTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsTypesRoutingModule {}
