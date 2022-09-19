import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { NewslettersListComponent } from './newsletters-list/newsletters-list.component';
import { NewslettersDeleteComponent } from './newsletters-delete/newsletters-delete.component';
import { NewslettersDetailsComponent } from './newsletters-details/newsletters-details.component';
import { NewslettersFormComponent } from './newsletters-form/newsletters-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: NewslettersDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: NewslettersListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Newsletter' },
    children: [
      {
        path: 'new',
        component: NewslettersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: NewslettersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: NewslettersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: NewslettersDeleteComponent,
      },
      {
        path: ':id/details',
        component: NewslettersDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewslettersRoutingModule {}
