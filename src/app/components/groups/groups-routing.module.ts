import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsDetailsComponent } from './groups-details/groups-details.component';
import { GroupsFormComponent } from './groups-form/groups-form.component';
import { GroupsDeleteComponent } from './groups-delete/groups-delete.component';
const formChildren: Routes = [
  {
    path: 'delete',
    component: GroupsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: GroupsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Group' },
    children: [
      {
        path: 'new',
        component: GroupsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: GroupsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: GroupsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: GroupsDeleteComponent,
      },
      {
        path: ':id/details',
        component: GroupsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
