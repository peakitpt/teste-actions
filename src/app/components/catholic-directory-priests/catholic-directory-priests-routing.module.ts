import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CatholicDirectoryPriestsListComponent } from './catholic-directory-priests-list/catholic-directory-priests-list.component';
import { CatholicDirectoryPriestsDetailsComponent } from './catholic-directory-priests-details/catholic-directory-priests-details.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: CatholicDirectoryPriestsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CatholicDirectoryPriest' },
    children: [
      {
        path: ':id/details',
        component: CatholicDirectoryPriestsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatholicDirectoryPriestsRoutingModule {}
