import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AccrualsProcessmentsListComponent } from './accruals-processments-list/accruals-processments-list.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: AccrualsProcessmentsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AccrualsProcessment' },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccrualsProcessmentsRoutingModule {}
