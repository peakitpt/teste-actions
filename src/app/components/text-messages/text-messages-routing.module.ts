import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { GroupsModalComponent } from 'src/app/shared/components/modals/groups-modal/groups-modal.component';
import { TextMessagesListComponent } from './text-messages-list/text-messages-list.component';
import { TextMessagesDetailsComponent } from './text-messages-details/text-messages-details.component';
import { TextMessagesFormComponent } from './text-messages-form/text-messages-form.component';
import { TextMessagesDeleteComponent } from './text-messages-delete/text-messages-delete.component';

const formChildren: Routes = [
  {
    path: 'groups-modal',
    component: GroupsModalComponent,
  },
  {
    path: 'delete',
    component: TextMessagesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: TextMessagesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'TextMessage' },
    children: [
      {
        path: 'new',
        component: TextMessagesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: TextMessagesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: TextMessagesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: TextMessagesDeleteComponent,
      },
      {
        path: ':id/details',
        component: TextMessagesDetailsComponent,
        children: [formChildren[1]],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextMessagesRoutingModule {}
