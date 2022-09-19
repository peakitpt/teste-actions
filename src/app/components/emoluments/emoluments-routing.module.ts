import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { EmolumentsListComponent } from './emoluments-list/emoluments-list.component';
import { EmolumentsDetailsComponent } from './emoluments-details/emoluments-details.component';
import { EmolumentsFormComponent } from './emoluments-form/emoluments-form.component';
import { EmolumentsDeleteComponent } from './emoluments-delete/emoluments-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: EmolumentsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: EmolumentsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Emolument' },
    children: [
      {
        path: 'new',
        component: EmolumentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: EmolumentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: EmolumentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: EmolumentsDeleteComponent,
      },
      {
        path: ':id/details',
        component: EmolumentsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmolumentsRoutingModule {}
