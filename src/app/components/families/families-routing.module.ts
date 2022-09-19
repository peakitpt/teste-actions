import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { FamiliesListComponent } from './families-list/families-list.component';
import { FamiliesDetailsComponent } from './families-details/families-details.component';
import { FamiliesFormComponent } from './families-form/families-form.component';
import { FamiliesDeleteComponent } from './families-delete/families-delete.component';

// Quick Insertion
import { PersonsFormComponent } from '../persons/persons-form/persons-form.component';
import { ChapelriesFormComponent } from '../chapelries/chapelries-form/chapelries-form.component';
import { ArchpristshipsModalComponent } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.component';
import { PatronsModalComponent } from 'src/app/shared/components/modals/patrons-modal/patrons-modal.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: FamiliesDeleteComponent,
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
    children: [formChildren[1], formChildren[2]],
  },
  {
    path: 'quick-insert-chapelries-modal',
    component: ChapelriesFormComponent,
    children: [
      formChildren[1],
      formChildren[2],
      {
        path: 'archpristships-modal',
        component: ArchpristshipsModalComponent,
      },
      {
        path: 'patrons-modal',
        component: PatronsModalComponent,
      },
    ],
  },
];

const routes: Routes = [
  {
    path: '',
    component: FamiliesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Family' },
    children: [
      {
        path: 'new',
        component: FamiliesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: FamiliesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: FamiliesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: FamiliesDeleteComponent,
      },
      {
        path: ':id/details',
        component: FamiliesDetailsComponent,
        children: [formChildren[0]],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamiliesRoutingModule {}
