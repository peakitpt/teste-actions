import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { GestdocumentsListComponent } from './gestdocuments-list/gestdocuments-list.component';
import { GestdocumentsDeleteComponent } from './gestdocuments-delete/gestdocuments-delete.component';
import { GestdocumentsDetailsComponent } from './gestdocuments-details/gestdocuments-details.component';
import { GestdocumentsFormComponent } from './gestdocuments-form/gestdocuments-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: GestdocumentsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: GestdocumentsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Gestdocument' },
    children: [
      {
        path: 'new',
        component: GestdocumentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: GestdocumentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: GestdocumentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: GestdocumentsDeleteComponent,
      },
      {
        path: ':id/details',
        component: GestdocumentsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestdocumentsRoutingModule {}
