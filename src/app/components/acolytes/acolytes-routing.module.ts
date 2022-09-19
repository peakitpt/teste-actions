import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcolytesDeleteComponent } from './acolytes-delete/acolytes-delete.component';
import { AcolytesListComponent } from './acolytes-list/acolytes-list.component';
import { AcolytesFormComponent } from './acolytes-form/acolytes-form.component';
import { AcolytesDetailsComponent } from './acolytes-details/acolytes-details.component';
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
    component: AcolytesDeleteComponent,
  }
];
const routes: Routes = [
  {
    path: '',
    component: AcolytesListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'Acolytes' },
    children: [
      {
        path: 'new',
        component: AcolytesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: AcolytesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: AcolytesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: AcolytesDeleteComponent,
      },
      {
        path: ':id/details',
        component: AcolytesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcolytesRoutingModule { }
