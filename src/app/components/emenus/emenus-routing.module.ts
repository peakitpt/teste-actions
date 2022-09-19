import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { EmenusListComponent } from './emenus-list/emenus-list.component';
import { EmenusDetailsComponent } from './emenus-details/emenus-details.component';
import { EmenusFormComponent } from './emenus-form/emenus-form.component';
import { EmenusDeleteComponent } from './emenus-delete/emenus-delete.component';
import { ContentsModalComponent } from 'src/app/shared/components/modals/contents-modal/contents-modal.component';
import { SectionsModalComponent } from 'src/app/shared/components/modals/sections-modal/sections-modal.component';
import { LayoutsModalComponent } from 'src/app/shared/components/modals/layouts-modal/layouts-modal.component';

// Quick Insertion
import { ContentsFormComponent } from '../contents/contents-form/contents-form.component';

const formChildren: Routes = [
  {
    path: 'contents-modal',
    component: ContentsModalComponent,
  },
  {
    path: 'sections-modal',
    component: SectionsModalComponent,
  },
  {
    path: 'templates-modal',
    component: LayoutsModalComponent,
  },
  {
    path: 'delete',
    component: EmenusDeleteComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-contents-modal',
    component: ContentsFormComponent,
    children: formChildren,
  },
];

const routes: Routes = [
  {
    path: '',
    component: EmenusListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Emenu' },
    children: [
      {
        path: 'new',
        component: EmenusFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: EmenusFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: EmenusFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: EmenusDeleteComponent,
      },
      {
        path: ':id/details',
        component: EmenusDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmenusRoutingModule {}
