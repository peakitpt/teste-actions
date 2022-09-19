import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChapelriesDeleteComponent } from './chapelries-delete/chapelries-delete.component';
import { ChapelriesListComponent } from './chapelries-list/chapelries-list.component';
import { ChapelriesFormComponent } from './chapelries-form/chapelries-form.component';
import { ChapelriesDetailsComponent } from './chapelries-details/chapelries-details.component';
import { BishopricsModalComponent } from 'src/app/shared/components/modals/bishoprics-modal/bishoprics-modal.component';
import { ArchpristshipsModalComponent } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.component';
import { PatronsModalComponent } from 'src/app/shared/components/modals/patrons-modal/patrons-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { PatronsFormComponent } from '../patrons/patrons-form/patrons-form.component';
import { ArchpristshipsFormComponent } from '../archpristships/archpristships-form/archpristships-form.component';
import { WorshipplacesFormComponent } from '../worshipplaces/worshipplaces-form/worshipplaces-form.component';

const formChildren: Routes = [
  {
    path: 'worshipplaces-modal',
    component: WorshipplacesModalComponent,
  },
  {
    path: 'patrons-modal',
    component: PatronsModalComponent,
  },
  {
    path: 'archpristships-modal',
    component: ArchpristshipsModalComponent,
  },
  {
    path: 'bishoprics-modal',
    component: BishopricsModalComponent,
  },
  {
    path: 'delete',
    component: ChapelriesDeleteComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-worshipplaces-modal',
    component: WorshipplacesFormComponent,
    children: [
      formChildren[1],
      {
        path: 'chapelries-modal',
        component: ChapelriesModalComponent,
      },
      {
        path: 'archpristships-modal',
        component: ArchpristshipsModalComponent,
      },
      {
        path: 'bishoprics-modal',
        component: BishopricsModalComponent,
      },
    ],
  },
  {
    path: 'quick-insert-archpristships-modal',
    component: ArchpristshipsFormComponent,
    children: [
      formChildren[1],
      {
        path: 'bishoprics-modal',
        component: BishopricsModalComponent,
      },
    ],
  },
  {
    path: 'quick-insert-patrons-modal',
    component: PatronsFormComponent,
    children: [formChildren[1]],
  },
];

const routes: Routes = [
  {
    path: '',
    component: ChapelriesListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'Chapelry' },
    children: [
      {
        path: 'archpristships-modal',
        component: ArchpristshipsModalComponent,
      },
      {
        path: 'bishoprics-modal',
        component: BishopricsModalComponent,
      },
      {
        path: 'new',
        component: ChapelriesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: ChapelriesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: ChapelriesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: ChapelriesDeleteComponent,
      },
      {
        path: ':id/details',
        component: ChapelriesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapelriesRoutingModule {}
