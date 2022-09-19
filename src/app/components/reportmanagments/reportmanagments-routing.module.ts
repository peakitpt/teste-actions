import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ReportmanagmentsFormComponent } from './reportmanagments-form/reportmanagments-form.component';
import { ContentsModalComponent } from 'src/app/shared/components/modals/contents-modal/contents-modal.component';
import { SectionsModalComponent } from 'src/app/shared/components/modals/sections-modal/sections-modal.component';

const formChildren: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: ReportmanagmentsFormComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Reportmanagment' },
    children: formChildren,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportmanagmentsRoutingModule {}
