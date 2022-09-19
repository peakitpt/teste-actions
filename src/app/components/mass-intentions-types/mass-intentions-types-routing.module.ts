import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { MassIntentionsTypesListComponent } from './mass-intentions-types-list/mass-intentions-types-list.component';
import { MassIntentionsTypesDeleteComponent } from './mass-intentions-types-delete/mass-intentions-types-delete.component';
import { MassIntentionsTypesDetailsComponent } from './mass-intentions-types-details/mass-intentions-types-details.component';
import { MassIntentionsTypesFormComponent } from './mass-intentions-types-form/mass-intentions-types-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: MassIntentionsTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: MassIntentionsTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'MassIntentionsType' },
    children: [
      {
        path: 'new',
        component: MassIntentionsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: MassIntentionsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: MassIntentionsTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: MassIntentionsTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: MassIntentionsTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MassIntentionsTypesRoutingModule {}
