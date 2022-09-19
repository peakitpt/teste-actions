import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ReportsGroupsListComponent } from './reports-groups-list/reports-groups-list.component';
import { ReportsGroupsDetailsComponent } from './reports-groups-details/reports-groups-details.component';
import { ReportsGroupsFormComponent } from './reports-groups-form/reports-groups-form.component';
import { ReportsGroupsDeleteComponent } from './reports-groups-delete/reports-groups-delete.component';
import { ReportsGroupersModalComponent } from 'src/app/shared/components/modals/reports-groupers-modal/reports-groupers-modal.component';
import { ReportsModalComponent } from 'src/app/shared/components/modals/reports-modal/reports-modal.component';

const formChildren: Routes = [
  {
    path: 'reports-modal',
    component: ReportsModalComponent,
  },
  {
    path: 'reports-groupers-modal',
    component: ReportsGroupersModalComponent,
  },
  {
    path: 'delete',
    component: ReportsGroupsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: ReportsGroupsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'ReportsGroup' },
    children: [
      {
        path: 'new',
        component: ReportsGroupsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: ReportsGroupsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: ReportsGroupsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: ReportsGroupsDeleteComponent,
      },
      {
        path: ':id/details',
        component: ReportsGroupsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsGroupsRoutingModule {}
