import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { CuriaAdministrativeProcessTypesListComponent } from './curia-administrative-process-types-list/curia-administrative-process-types-list.component';
import { CuriaAdministrativeProcessTypesDeleteComponent } from './curia-administrative-process-types-delete/curia-administrative-process-types-delete.component';
import { CuriaAdministrativeProcessTypesDetailsComponent } from './curia-administrative-process-types-details/curia-administrative-process-types-details.component';
import { CuriaAdministrativeProcessTypesFormComponent } from './curia-administrative-process-types-form/curia-administrative-process-types-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaAdministrativeProcessTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: CuriaAdministrativeProcessTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaAdministrativeProcessType' },
    children: [
      {
        path: 'new',
        component: CuriaAdministrativeProcessTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: CuriaAdministrativeProcessTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: CuriaAdministrativeProcessTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: CuriaAdministrativeProcessTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaAdministrativeProcessTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaAdministrativeProcessTypesRoutingModule {}
