import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BishopricIntegratedViewsListComponent } from './bishopric-integrated-views-list/bishopric-integrated-views-list.component';
import { BishopricIntegratedViewsDetailsComponent } from './bishopric-integrated-views-details/bishopric-integrated-views-details.component';

const routes: Routes = [
  {
    path: '',
    component: BishopricIntegratedViewsListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'BishopricIntegratedView' },
    children: [
      {
        path: ':id/details',
        component: BishopricIntegratedViewsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BishopricIntegratedViewsRoutingModule {}
