import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { CuriaFunctionsListComponent } from './curia-functions-list/curia-functions-list.component';
import { CuriaFunctionsDeleteComponent } from './curia-functions-delete/curia-functions-delete.component';
import { CuriaFunctionsDetailsComponent } from './curia-functions-details/curia-functions-details.component';
import { CuriaFunctionsFormComponent } from './curia-functions-form/curia-functions-form.component';
import { AppointmentTypesModalComponent } from 'src/app/shared/components/modals/appointment-types-modal/appointment-types-modal.component';

// Quick Insertion
import { AppointmentTypesFormComponent } from '../appointment-types/appointment-types-form/appointment-types-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaFunctionsDeleteComponent,
  },
  {
    path: 'appointment-types-modal',
    component: AppointmentTypesModalComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-appointment-types-modal',
    component: AppointmentTypesFormComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: CuriaFunctionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaFunction' },
    children: [
      {
        path: 'appointment-types-modal',
        component: AppointmentTypesModalComponent,
      },
      {
        path: 'new',
        component: CuriaFunctionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: CuriaFunctionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: CuriaFunctionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: CuriaFunctionsDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaFunctionsDetailsComponent,
        children: [formChildren[0]],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaFunctionsRoutingModule {}
