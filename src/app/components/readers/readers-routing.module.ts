import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadersDeleteComponent } from './readers-delete/readers-delete.component';
import { ReadersListComponent } from './readers-list/readers-list.component';
import { ReadersFormComponent } from './readers-form/readers-form.component';
import { ReadersDetailsComponent } from './readers-details/readers-details.component';
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
    component: ReadersDeleteComponent,
  }
];
const routes: Routes = [
  {
    path: '',
    component: ReadersListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'Readers' },
    children: [
      {
        path: 'new',
        component: ReadersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: ReadersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: ReadersFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: ReadersDeleteComponent,
      },
      {
        path: ':id/details',
        component: ReadersDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadersRoutingModule { }
