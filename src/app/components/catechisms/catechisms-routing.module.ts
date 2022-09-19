import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CatechismsListComponent } from './catechisms-list/catechisms-list.component';
import { CatechismsDeleteComponent } from './catechisms-delete/catechisms-delete.component';
import { CatechismsFormComponent } from './catechisms-form/catechisms-form.component';
import { CatechismsDetailsComponent } from './catechisms-details/catechisms-details.component';

import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';

// Quick Insertion
import { PersonsFormComponent } from '../persons/persons-form/persons-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CatechismsDeleteComponent,
  },
  {
    path: 'persons-modal',
    component: PersonsModalComponent,
  },
  {
    path: 'chapelries-modal',
    component: ChapelriesModalComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-persons-modal',
    component: PersonsFormComponent,
    children: [
      formChildren[1],
      {
        path: 'chapelries-modal',
        component: ChapelriesModalComponent,
      },
    ],
  },
];

const routes: Routes = [
  {
    path: '',
    component: CatechismsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Catechism' },
    children: [
      {
        path: 'new',
        component: CatechismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: CatechismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: CatechismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: CatechismsDeleteComponent,
      },
      {
        path: ':id/details',
        component: CatechismsDetailsComponent,
        children: [formChildren[0]],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatechismsRoutingModule {}
