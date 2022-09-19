import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchpristshipsDeleteComponent } from './archpristships-delete/archpristships-delete.component';
import { ArchpristshipsListComponent } from './archpristships-list/archpristships-list.component';
import { ArchpristshipsFormComponent } from './archpristships-form/archpristships-form.component';
import { ArchpristshipsDetailsComponent } from './archpristships-details/archpristships-details.component';
import { BishopricsModalComponent } from 'src/app/shared/components/modals/bishoprics-modal/bishoprics-modal.component';
import { BishopricsFormComponent } from '../bishoprics/bishoprics-form/bishoprics-form.component';
import { ReportsGroupsModalComponent } from 'src/app/shared/components/modals/reports-groups-modal/reports-groups-modal.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';

const formChildren: Routes = [
  {
    path: 'bishoprics-modal',
    component: BishopricsModalComponent,
  },
  {
    path: 'delete',
    component: ArchpristshipsDeleteComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-bishoprics-modal',
    component: BishopricsFormComponent,
    children: [
      formChildren[1],
      {
        path: 'reports-groups-modal',
        component: ReportsGroupsModalComponent,
      },
      {
        path: 'countries-modal',
        component: CountriesModalComponent,
      },
    ],
  },
];

const routes: Routes = [
  {
    path: '',
    component: ArchpristshipsListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'Archpristship' },
    children: [
      {
        path: 'bishoprics-modal',
        component: BishopricsModalComponent,
      },
      {
        path: 'new',
        component: ArchpristshipsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: ArchpristshipsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: ArchpristshipsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: ArchpristshipsDeleteComponent,
      },
      {
        path: ':id/details',
        component: ArchpristshipsDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchpristshipsRoutingModule {}
