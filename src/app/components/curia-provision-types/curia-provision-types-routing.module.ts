import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { CuriaProvisionTypesListComponent } from './curia-provision-types-list/curia-provision-types-list.component';
import { CuriaProvisionTypesDeleteComponent } from './curia-provision-types-delete/curia-provision-types-delete.component';
import { CuriaProvisionTypesDetailsComponent } from './curia-provision-types-details/curia-provision-types-details.component';
import { CuriaProvisionTypesFormComponent } from './curia-provision-types-form/curia-provision-types-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaProvisionTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: CuriaProvisionTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaProvisionType' },
    children: [
      {
        path: 'new',
        component: CuriaProvisionTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: CuriaProvisionTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: CuriaProvisionTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: CuriaProvisionTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaProvisionTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaProvisionTypesRoutingModule {}
