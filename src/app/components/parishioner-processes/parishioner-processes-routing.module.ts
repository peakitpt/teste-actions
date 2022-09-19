import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ParishionerProcessesListComponent } from './parishioner-processes-list/parishioner-processes-list.component';

// QUICK INSERTION
import { ViewsModalComponent } from 'src/app/shared/components/modals/views-modal/views-modal.component';

const routes: Routes = [
  {
    path: ':id',
    component: ParishionerProcessesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'ParishionerProcess' },
    children: [
      {
        path: 'views-modal',
        component: ViewsModalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParishionerProcessesRoutingModule {}
