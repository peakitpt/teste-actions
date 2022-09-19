import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CatholicDirectoryInstitutionsListComponent } from './catholic-directory-institutions-list/catholic-directory-institutions-list.component';
import { CatholicDirectoryInstitutionsDetailsComponent } from './catholic-directory-institutions-details/catholic-directory-institutions-details.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: CatholicDirectoryInstitutionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CatholicDirectoryInstitution' },
    children: [
      {
        path: ':id/details',
        component: CatholicDirectoryInstitutionsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatholicDirectoryInstitutionsRoutingModule {}
