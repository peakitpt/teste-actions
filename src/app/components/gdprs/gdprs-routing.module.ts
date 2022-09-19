import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { GDPRSDetailsComponent } from './gdprs-details/gdprs-details.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: GDPRSDetailsComponent,
    children: formChildren,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GDPRSRoutingModule {}
