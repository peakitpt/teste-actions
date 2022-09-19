import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { SubscriptionStatisticsDetailsComponent } from './subscription-statistics-details/subscription-statistics-details.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: SubscriptionStatisticsDetailsComponent,
    canActivate: [PermissionGuard],
    data: { view: 'SubscriptionStatistic' },
    children: formChildren,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionStatisticsRoutingModule {}
