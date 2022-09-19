import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { EmolumentsTypesListComponent } from './emoluments-types-list/emoluments-types-list.component';
import { EmolumentsTypesDetailsComponent } from './emoluments-types-details/emoluments-types-details.component';
import { EmolumentsTypesFormComponent } from './emoluments-types-form/emoluments-types-form.component';
import { EmolumentsTypesDeleteComponent } from './emoluments-types-delete/emoluments-types-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: EmolumentsTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: EmolumentsTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Emolument' },
    children: [
      {
        path: 'new',
        component: EmolumentsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: EmolumentsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: EmolumentsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: EmolumentsTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: EmolumentsTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmolumentsTypesRoutingModule {}
