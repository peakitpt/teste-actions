import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorshipplacesDeleteComponent } from './worshipplaces-delete/worshipplaces-delete.component';
import { WorshipplacesListComponent } from './worshipplaces-list/worshipplaces-list.component';
import { WorshipplacesFormComponent } from './worshipplaces-form/worshipplaces-form.component';
import { WorshipplacesDetailsComponent } from './worshipplaces-details/worshipplaces-details.component';
import { BishopricsModalComponent } from 'src/app/shared/components/modals/bishoprics-modal/bishoprics-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { ArchpristshipsModalComponent } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.component';
import { ChapelriesFormComponent } from '../chapelries/chapelries-form/chapelries-form.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { PatronsModalComponent } from 'src/app/shared/components/modals/patrons-modal/patrons-modal.component';

const formChildren: Routes = [
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
  {
    path: 'delete',
    component: WorshipplacesDeleteComponent,
  },
];
const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-chapelries-modal',
    component: ChapelriesFormComponent,
    children: [
      formChildren[1],
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
    ],
  },
];

const routes: Routes = [
  {
    path: '',
    component: WorshipplacesListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'Worshipplace' },
    children: [
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
      {
        path: 'new',
        component: WorshipplacesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: WorshipplacesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: WorshipplacesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: WorshipplacesDeleteComponent,
      },
      {
        path: ':id/details',
        component: WorshipplacesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorshipplacesRoutingModule {}
