import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ClergyTypesListComponent } from './clergy-types-list/clergy-types-list.component';
import { ClergyTypesDetailsComponent } from './clergy-types-details/clergy-types-details.component';
import { ClergyTypesFormComponent } from './clergy-types-form/clergy-types-form.component';
import { ClergyTypesDeleteComponent } from './clergy-types-delete/clergy-types-delete.component';
const formChildren: Routes = [
  {
    path: 'delete',
    component: ClergyTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: ClergyTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Group' },
    children: [
      {
        path: 'new',
        component: ClergyTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: ClergyTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: ClergyTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: ClergyTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: ClergyTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClergyTypesRoutingModule {}
