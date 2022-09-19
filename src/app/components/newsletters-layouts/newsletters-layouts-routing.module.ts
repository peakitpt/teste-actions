import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { NewslettersLayoutsListComponent } from './newsletters-layouts-list/newsletters-layouts-list.component';
import { NewslettersLayoutsDeleteComponent } from './newsletters-layouts-delete/newsletters-layouts-delete.component';
import { NewslettersLayoutsDetailsComponent } from './newsletters-layouts-details/newsletters-layouts-details.component';
import { NewslettersLayoutsFormComponent } from './newsletters-layouts-form/newsletters-layouts-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: NewslettersLayoutsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: NewslettersLayoutsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'NewslettersLayout' },
    children: [
      {
        path: 'new',
        component: NewslettersLayoutsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: NewslettersLayoutsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: NewslettersLayoutsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: NewslettersLayoutsDeleteComponent,
      },
      {
        path: ':id/details',
        component: NewslettersLayoutsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewslettersLayoutsRoutingModule {}
