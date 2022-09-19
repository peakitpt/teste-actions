import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { ModuleDocumentationLinksListComponent } from './module-documentation-links-list/module-documentation-links-list.component';
import { ModuleDocumentationLinksDetailsComponent } from './module-documentation-links-details/module-documentation-links-details.component';
import { ModuleDocumentationLinksFormComponent } from './module-documentation-links-form/module-documentation-links-form.component';
import { ModuleDocumentationLinksDeleteComponent } from './module-documentation-links-delete/module-documentation-links-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: ModuleDocumentationLinksDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: ModuleDocumentationLinksListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'ModuleDocumentationLink' },
    children: [
      {
        path: 'new',
        component: ModuleDocumentationLinksFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: ModuleDocumentationLinksFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: ModuleDocumentationLinksFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: ModuleDocumentationLinksDeleteComponent,
      },
      {
        path: ':id/details',
        component: ModuleDocumentationLinksDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleDocumentationLinksRoutingModule {}
