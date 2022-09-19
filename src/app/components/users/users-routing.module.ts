import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { BishopricsModalComponent } from 'src/app/shared/components/modals/bishoprics-modal/bishoprics-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { UsersChangePasswordComponent } from './users-change-password/users-change-password.component';
import { SuperUserGuard } from 'src/app/auth/super-user.guard';

const formChildren: Routes = [
  {
    path: 'parishioners-modal',
    component: ParishionersModalComponent,
  },
  {
    path: 'bishoprics-modal',
    component: BishopricsModalComponent,
  },
  {
    path: 'delete',
    component: UsersDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    canActivate: [PermissionGuard, SuperUserGuard],
    data: { view: 'User' },
    children: [
      {
        path: 'new',
        component: UsersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/change-password',
        component: UsersChangePasswordComponent,
      },
      {
        path: ':id/duplicate',
        component: UsersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: UsersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: UsersDeleteComponent,
      },
      {
        path: ':id/details',
        component: UsersDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
