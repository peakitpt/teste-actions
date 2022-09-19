import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { TreasuryLocationsListComponent } from './treasury-locations-list/treasury-locations-list.component';
import { TreasuryLocationsDetailsComponent } from './treasury-locations-details/treasury-locations-details.component';
import { TreasuryLocationsFormComponent } from './treasury-locations-form/treasury-locations-form.component';
import { TreasuryLocationsDeleteComponent } from './treasury-locations-delete/treasury-locations-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: TreasuryLocationsDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: TreasuryLocationsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'TreasuryLocation' },
    children: [
      {
        path: 'new',
        component: TreasuryLocationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: TreasuryLocationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: TreasuryLocationsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: TreasuryLocationsDeleteComponent,
      },
      {
        path: ':id/details',
        component: TreasuryLocationsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreasuryLocationsRoutingModule {}
