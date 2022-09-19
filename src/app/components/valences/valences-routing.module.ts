import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ValencesListComponent } from './valences-list/valences-list.component';
import { ValencesDetailsComponent } from './valences-details/valences-details.component';
import { ValencesFormComponent } from './valences-form/valences-form.component';
import { ValencesDeleteComponent } from './valences-delete/valences-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: ValencesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: ValencesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Valence' },
    children: [
      {
        path: 'new',
        component: ValencesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: ValencesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: ValencesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: ValencesDeleteComponent,
      },
      {
        path: ':id/details',
        component: ValencesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValencesRoutingModule {}
