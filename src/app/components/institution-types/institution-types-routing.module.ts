import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { InstitutionTypesDeleteComponent } from './institution-types-delete/institution-types-delete.component';
import { InstitutionTypesDetailsComponent } from './institution-types-details/institution-types-details.component';
import { InstitutionTypesFormComponent } from './institution-types-form/institution-types-form.component';
import { InstitutionTypesListComponent } from './institution-types-list/institution-types-list.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: InstitutionTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: InstitutionTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Group' },
    children: [
      {
        path: 'new',
        component: InstitutionTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: InstitutionTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: InstitutionTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: InstitutionTypesDeleteComponent,
        children: formChildren
      },
      {
        path: ':id/details',
        component: InstitutionTypesDetailsComponent,
        children: formChildren
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionTypesRoutingModule {}
