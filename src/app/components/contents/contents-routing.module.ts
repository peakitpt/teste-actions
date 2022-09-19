import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ContentsListComponent } from './contents-list/contents-list.component';
import { ContentsDetailsComponent } from './contents-details/contents-details.component';
import { ContentsFormComponent } from './contents-form/contents-form.component';
import { ContentsDeleteComponent } from './contents-delete/contents-delete.component';
import { ContentsModalComponent } from 'src/app/shared/components/modals/contents-modal/contents-modal.component';

const formChildren: Routes = [
  {
    path: 'contents-modal',
    component: ContentsModalComponent
  },
  {
    path: 'delete',
    component: ContentsDeleteComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: ContentsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Content' },
    children: [
      {
        path: 'new',
        component: ContentsFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: ContentsFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: ContentsFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: ContentsDeleteComponent
      },
      {
        path: ':id/details',
        component: ContentsDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule {}
