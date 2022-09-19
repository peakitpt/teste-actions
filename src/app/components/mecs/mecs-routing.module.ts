import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MecsDeleteComponent } from './mecs-delete/mecs-delete.component';
import { MecsListComponent } from './mecs-list/mecs-list.component';
import { MecsFormComponent } from './mecs-form/mecs-form.component';
import { MecsDetailsComponent } from './mecs-details/mecs-details.component';
import { WorshipplacesModalComponent } from '../../shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { ChapelriesModalComponent } from '../../shared/components/modals/chapelries-modal/chapelries-modal.component';
import { FormationsModalComponent } from '../../shared/components/modals/formations-modal/formations-modal.component';

const formChildren: Routes = [
  {
    path: 'worshipplaces-modal',
    component: WorshipplacesModalComponent,
  },
  {
    path: 'chapelries-modal',
    component: ChapelriesModalComponent,
  },
  {
    path: 'formations-modal',
    component: FormationsModalComponent,
  },
  {
    path: 'delete',
    component: MecsDeleteComponent,
  }
];
const routes: Routes = [
  {
    path: '',
    component: MecsListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'Mecs' },
    children: [
      {
        path: 'new',
        component: MecsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: MecsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: MecsFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: MecsDeleteComponent,
      },
      {
        path: ':id/details',
        component: MecsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MecsRoutingModule { }
