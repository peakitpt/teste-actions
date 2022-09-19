import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { WebsiteconfigurationsFormComponent } from './websiteconfigurations-form/websiteconfigurations-form.component';
import { ContentsModalComponent } from 'src/app/shared/components/modals/contents-modal/contents-modal.component';
import { SectionsModalComponent } from 'src/app/shared/components/modals/sections-modal/sections-modal.component';

const formChildren: Routes = [
  {
    path: 'contents-modal',
    component: ContentsModalComponent
  },
  {
    path: 'sections-modal',
    component: SectionsModalComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: WebsiteconfigurationsFormComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Section' },
    children: formChildren
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteconfigurationsRoutingModule {}
