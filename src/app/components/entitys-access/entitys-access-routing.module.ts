import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { EntitysAccessListComponent } from './entitys-access-list/entitys-access-list.component';
import { EntitysAccessDeleteComponent } from './entitys-access-delete/entitys-access-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: EntitysAccessDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: EntitysAccessListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Emolument' },
    children: [
      {
        path: ':id/delete',
        component: EntitysAccessDeleteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitysAccessRoutingModule {}
