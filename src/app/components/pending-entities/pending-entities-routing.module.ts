import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { PendingEntitiesDetailsComponent } from './pending-entities-details/pending-entities-details.component';
import { PendingEntitiesListComponent } from './pending-entities-list/pending-entities-list.component';

// const formChildren: Routes = [
//   {
//     path: 'delete',
//     component: ClergyTypesDeleteComponent,
//   },
// ];

const routes: Routes = [
  {
    path: '',
    component: PendingEntitiesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Group' },
    children: [
      {
        path: ':id/details',
        component: PendingEntitiesDetailsComponent,
        // children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingEntitiesRoutingModule {}
