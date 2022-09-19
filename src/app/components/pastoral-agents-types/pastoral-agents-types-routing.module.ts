import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { PastoralAgentsTypesListComponent } from './pastoral-agents-types-list/pastoral-agents-types-list.component';
import { PastoralAgentsTypesDetailsComponent } from './pastoral-agents-types-details/pastoral-agents-types-details.component';
import { PastoralAgentsTypesFormComponent } from './pastoral-agents-types-form/pastoral-agents-types-form.component';
import { PastoralAgentsTypesDeleteComponent } from './pastoral-agents-types-delete/pastoral-agents-types-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: PastoralAgentsTypesDeleteComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: PastoralAgentsTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'PastoralAgentsType' },
    children: [
      {
        path: 'new',
        component: PastoralAgentsTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: PastoralAgentsTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: PastoralAgentsTypesFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: PastoralAgentsTypesDeleteComponent
      },
      {
        path: ':id/details',
        component: PastoralAgentsTypesDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PastoralAgentsTypesRoutingModule { }
