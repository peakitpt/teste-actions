import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ReportsGroupersListComponent } from './reports-groupers-list/reports-groupers-list.component';
import { ReportsGroupersDetailsComponent } from './reports-groupers-details/reports-groupers-details.component';
import { ReportsGroupersFormComponent } from './reports-groupers-form/reports-groupers-form.component';
import { ReportsGroupersDeleteComponent } from './reports-groupers-delete/reports-groupers-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: ReportsGroupersDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: ReportsGroupersListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'ReportsGrouper' },
    children: [
      {
        path: 'new',
        component: ReportsGroupersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: ReportsGroupersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: ReportsGroupersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: ReportsGroupersDeleteComponent,
      },
      {
        path: ':id/details',
        component: ReportsGroupersDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsGroupersRoutingModule {}
