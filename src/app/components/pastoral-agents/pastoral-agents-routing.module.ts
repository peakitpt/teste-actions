import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PastoralAgentsDeleteComponent } from '../pastoral-agents/pastoral-agents-delete/pastoral-agents-delete.component';
import { PastoralAgentsListComponent } from '../pastoral-agents/pastoral-agents-list/pastoral-agents-list.component';
import { PastoralAgentsFormComponent } from '../pastoral-agents/pastoral-agents-form/pastoral-agents-form.component';
import { PastoralAgentsDetailsComponent } from '../pastoral-agents/pastoral-agents-details/pastoral-agents-details.component';
import { ChapelriesModalComponent } from '../../shared/components/modals/chapelries-modal/chapelries-modal.component';
import { FormationsModalComponent } from '../../shared/components/modals/formations-modal/formations-modal.component';
import { PastoralAgentsTypesModalComponent } from '../../shared/components/modals/pastoral-agents-types-modal/pastoral-agents-types-modal.component';

const formChildren: Routes = [
  {
    path: 'chapelries-modal',
    component: ChapelriesModalComponent,
  },
  {
    path: 'formations-modal',
    component: FormationsModalComponent,
  },
  {
    path: 'pastoral-agents-types-modal',
    component: PastoralAgentsTypesModalComponent,
  },
  {
    path: 'delete',
    component: PastoralAgentsDeleteComponent,
  },
];
const routes: Routes = [
  {
    path: '',
    component: PastoralAgentsListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'PastoralAgents' },
    children: [
      {
        path: 'formations-modal',
        component: FormationsModalComponent,
      },
      {
        path: 'new',
        component: PastoralAgentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: PastoralAgentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: PastoralAgentsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: PastoralAgentsDeleteComponent,
      },
      {
        path: ':id/details',
        component: PastoralAgentsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastoralAgentsRoutingModule {}
