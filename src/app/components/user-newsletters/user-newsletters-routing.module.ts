import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNewslettersListComponent } from './user-newsletters-list/user-newsletters-list.component';
import { UserNewslettersDetailsComponent } from './user-newsletters-details/user-newsletters-details.component';
import { UserNewslettersDeleteComponent } from './user-newsletters-delete/user-newsletters-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: UserNewslettersDeleteComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: UserNewslettersListComponent,
    children: [
      {
        path: ':id/delete',
        component: UserNewslettersDeleteComponent
      },
      {
        path: ':id/details',
        component: UserNewslettersDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNewslettersRoutingModule {}
