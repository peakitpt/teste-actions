import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { FormationsListComponent } from './formations-list/formations-list.component';
import { FormationsDetailsComponent } from './formations-details/formations-details.component';
import { FormationsFormComponent } from './formations-form/formations-form.component';
import { FormationsDeleteComponent } from './formations-delete/formations-delete.component';
import { FormationTypesDetailsComponent } from '../formation-types/formation-types-details/formation-types-details.component';
import { FormationTypesModalComponent } from 'src/app/shared/components/modals/formation-types-modal/formation-types-modal.component';

const formChildren: Routes = [
  {
    path: 'formation-types-modal',
    component: FormationTypesModalComponent
  },
  {
    path: 'delete',
    component: FormationsDeleteComponent
  },
  {
    path: 'formation-types/:id/details',
    component: FormationTypesDetailsComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: FormationsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Formation' },
    children: [
      {
        path: 'new',
        component: FormationsFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: FormationsFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: FormationsFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: FormationsDeleteComponent
      },
      {
        path: ':id/details',
        component: FormationsDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationsRoutingModule {}
