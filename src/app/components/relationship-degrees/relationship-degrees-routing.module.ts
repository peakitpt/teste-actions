import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { RelationshipDegreesListComponent } from './relationship-degrees-list/relationship-degrees-list.component';
import { RelationshipDegreesDetailsComponent } from './relationship-degrees-details/relationship-degrees-details.component';
import { RelationshipDegreesFormComponent } from './relationship-degrees-form/relationship-degrees-form.component';
import { RelationshipDegreesDeleteComponent } from './relationship-degrees-delete/relationship-degrees-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: RelationshipDegreesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: RelationshipDegreesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'RelationshipDegree' },
    children: [
      {
        path: 'new',
        component: RelationshipDegreesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: RelationshipDegreesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: RelationshipDegreesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: RelationshipDegreesDeleteComponent,
      },
      {
        path: ':id/details',
        component: RelationshipDegreesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelationshipDegreesRoutingModule {}
