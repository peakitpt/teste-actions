import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { InstitutionsListComponent } from './institutions-list/institutions-list.component';
import { InstitutionsDeleteComponent } from './institutions-delete/institutions-delete.component';
import { InstitutionsDetailsComponent } from './institutions-details/institutions-details.component';
import { InstitutionsFormComponent } from './institutions-form/institutions-form.component';

// Quick insertions
import { InstitutionsTypesModalComponent } from 'src/app/shared/components/modals/institutions-types-modal/institutions-types-modal.component';
import { ArchpristshipsModalComponent } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { ValencesModalComponent } from 'src/app/shared/components/modals/valences-modal/valences-modal.component';
import { InstitutionsModalComponent } from 'src/app/shared/components/modals/institutions-modal/institutions-modal.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: InstitutionsDeleteComponent,
  },
  {
    path: 'institution-types-modal',
    component: InstitutionsTypesModalComponent,
  },
  {
    path: 'archpristship-modal',
    component: ArchpristshipsModalComponent,
  },
  {
    path: 'chapelry-modal',
    component: ChapelriesModalComponent,
  },
  {
    path: 'country-modal',
    component: CountriesModalComponent,
  },
  {
    path: 'valences-modal',
    component: ValencesModalComponent,
  },
  {
    path: 'secular-institution-modal',
    component: InstitutionsModalComponent,
  },

  {
    path: 'congregation-modal',
    component: InstitutionsModalComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'institution-types-modal',
    component: InstitutionsTypesModalComponent,
  },
  {
    path: 'archpristship-modal',
    component: ArchpristshipsModalComponent,
  },
  {
    path: 'chapelry-modal',
    component: ChapelriesModalComponent,
  },
  {
    path: 'country-modal',
    component: ChapelriesModalComponent,
  },
  {
    path: 'valences-modal',
    component: ValencesModalComponent,
  },
  {
    path: 'secular-institution-modal',
    component: InstitutionsModalComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: InstitutionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Institution' },
    children: [
      {
        path: 'institution-types-modal',
        component: InstitutionsTypesModalComponent,
      },
      {
        path: 'new',
        component: InstitutionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: InstitutionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: InstitutionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: InstitutionsDeleteComponent,
      },
      {
        path: ':id/details',
        component: InstitutionsDetailsComponent,
        children: [formChildren[0]],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionsRoutingModule {}
