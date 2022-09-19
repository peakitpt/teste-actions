import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { NominationsListComponent } from './nominations-list/nominations-list.component';
import { NominationsDetailsComponent } from './nominations-details/nominations-details.component';
import { NominationsFormComponent } from './nominations-form/nominations-form.component';
import { NominationsDeleteComponent } from './nominations-delete/nominations-delete.component';

// QUICK INSERTION
import { CuriaFunctionsModalComponent } from 'src/app/shared/components/modals/curia-functions-modal/curia-functions-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { PriestsV1ModalComponent } from 'src/app/shared/components/modals/priests-v1-modal/priests-v1-modal.component';

const formChildren: Routes = [
  {
    path: 'curia-functions-modal',
    component: CuriaFunctionsModalComponent,
  },
  {
    path: 'parishioners-modal',
    component: ParishionersModalComponent,
  },
  {
    path: 'priests-v1-modal',
    component: PriestsV1ModalComponent,
  },
  {
    path: 'delete',
    component: NominationsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: NominationsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Nomination' },
    children: [
      {
        path: 'curia-functions-modal',
        component: CuriaFunctionsModalComponent,
      },
      {
        path: 'parishioners-modal',
        component: ParishionersModalComponent,
      },
      {
        path: 'new',
        component: NominationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: NominationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: NominationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: NominationsDeleteComponent,
      },
      {
        path: ':id/details',
        component: NominationsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NominationsRoutingModule {}
