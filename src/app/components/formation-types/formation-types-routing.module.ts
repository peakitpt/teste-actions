import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { FormationTypesListComponent } from './formation-types-list/formation-types-list.component';
import { FormationTypesDetailsComponent } from './formation-types-details/formation-types-details.component';
import { FormationTypesFormComponent } from './formation-types-form/formation-types-form.component';
import { FormationTypesDeleteComponent } from './formation-types-delete/formation-types-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: FormationTypesDeleteComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: FormationTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'FormationsType' },
    children: [
      {
        path: 'new',
        component: FormationTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: FormationTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: FormationTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: FormationTypesDeleteComponent
      },
      {
        path: ':id/details',
        component: FormationTypesDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationTypesRoutingModule { }
