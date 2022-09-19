import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { AppointmentTypesListComponent } from './appointment-types-list/appointment-types-list.component';
import { AppointmentTypesDeleteComponent } from './appointment-types-delete/appointment-types-delete.component';
import { AppointmentTypesDetailsComponent } from './appointment-types-details/appointment-types-details.component';
import { AppointmentTypesFormComponent } from './appointment-types-form/appointment-types-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: AppointmentTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: AppointmentTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AppointmentType' },
    children: [
      {
        path: 'new',
        component: AppointmentTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AppointmentTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AppointmentTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AppointmentTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: AppointmentTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentTypesRoutingModule {}
