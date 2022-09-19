import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { SectionsListComponent } from './sections-list/sections-list.component';
import { SectionsDetailsComponent } from './sections-details/sections-details.component';
import { SectionsFormComponent } from './sections-form/sections-form.component';
import { SectionsDeleteComponent } from './sections-delete/sections-delete.component';
const formChildren: Routes = [
  {
    path: 'delete',
    component: SectionsDeleteComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: SectionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Section' },
    children: [
      {
        path: 'new',
        component: SectionsFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: SectionsFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: SectionsFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: SectionsDeleteComponent
      },
      {
        path: ':id/details',
        component: SectionsDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }
