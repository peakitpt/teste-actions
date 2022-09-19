import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { NumerationsViewsListComponent } from './numerations-views-list/numerations-views-list.component';
import { NumerationsViewsDetailsComponent } from './numerations-views-details/numerations-views-details.component';
import { NumerationsViewsFormComponent } from './numerations-views-form/numerations-views-form.component';
import { NumerationsViewsDeleteComponent } from './numerations-views-delete/numerations-views-delete.component';
import { NumerationsModalComponent } from 'src/app/shared/components/modals/numerations-modal/numerations-modal.component';

const formChildren: Routes = [
  {
    path: 'numerations-modal',
    component: NumerationsModalComponent,
  },
  {
    path: 'delete',
    component: NumerationsViewsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: NumerationsViewsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Numeration' },
    children: [
      {
        path: 'new',
        component: NumerationsViewsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: NumerationsViewsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: NumerationsViewsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: NumerationsViewsDeleteComponent,
      },
      {
        path: ':id/details',
        component: NumerationsViewsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumerationsViewsRoutingModule {}
