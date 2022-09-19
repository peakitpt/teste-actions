import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { NumerationsListComponent } from './numerations-list/numerations-list.component';
import { NumerationsDetailsComponent } from './numerations-details/numerations-details.component';
import { NumerationsFormComponent } from './numerations-form/numerations-form.component';
import { NumerationsDeleteComponent } from './numerations-delete/numerations-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: NumerationsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: NumerationsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Numeration' },
    children: [
      {
        path: 'new',
        component: NumerationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: NumerationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: NumerationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: NumerationsDeleteComponent,
      },
      {
        path: ':id/details',
        component: NumerationsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumerationsRoutingModule {}
