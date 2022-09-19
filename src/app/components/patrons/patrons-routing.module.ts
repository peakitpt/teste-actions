import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatronsDeleteComponent } from './patrons-delete/patrons-delete.component';
import { PatronsListComponent } from './patrons-list/patrons-list.component';
import { PatronsFormComponent } from './patrons-form/patrons-form.component';
import { PatronsDetailsComponent } from './patrons-details/patrons-details.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: PatronsDeleteComponent,
  }
];
const routes: Routes = [
  {
    path: '',
    component: PatronsListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'Patrons' },
    children: [
      {
        path: 'new',
        component: PatronsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: PatronsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: PatronsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: PatronsDeleteComponent,
      },
      {
        path: ':id/details',
        component: PatronsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatronsRoutingModule { }
