import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { AdminStatisticsDetailsComponent } from './admin-statistics-details/admin-statistics-details.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: AdminStatisticsDetailsComponent,
    canActivate: [PermissionGuard],
    data: { view: 'AdminStatistic' },
    children: formChildren,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminStatisticsRoutingModule {}
