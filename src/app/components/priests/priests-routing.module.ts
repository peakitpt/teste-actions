import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { PriestsListComponent } from './priests-list/priests-list.component';
import { PriestsDetailsComponent } from './priests-details/priests-details.component';
import { PriestsFormComponent } from './priests-form/priests-form.component';
import { PriestsDeleteComponent } from './priests-delete/priests-delete.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';
import { CountriesFormComponent } from '../countries/countries-form/countries-form.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { ChapelriesFormComponent } from '../chapelries/chapelries-form/chapelries-form.component';
import { ArchpristshipsModalComponent } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.component';
import { PatronsModalComponent } from 'src/app/shared/components/modals/patrons-modal/patrons-modal.component';
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { PersonsFormComponent } from '../persons/persons-form/persons-form.component';
import { CuriaFunctionsModalComponent } from 'src/app/shared/components/modals/curia-functions-modal/curia-functions-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { ClergyTypesModalComponent } from 'src/app/shared/components/modals/clergy-types-modal/clergy-types-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { PriestsModalComponent } from 'src/app/shared/components/modals/priests-modal/priests-modal.component';
import { PlacesModalComponent } from 'src/app/shared/components/modals/places-modal/places-modal.component';


const formChildren: Routes = [
  {
    path: 'delete',
    component: PriestsDeleteComponent,
  },
  {
    path: 'countries-modal',
    component: CountriesModalComponent,
  },
  {
    path: 'chapelries-modal',
    component: ChapelriesModalComponent,
  },
  {
    path: 'persons-modal',
    component: PersonsModalComponent,
  },
  {
    path: 'curia-functions-modal',
    component: CuriaFunctionsModalComponent,
  },
  {
    path: 'parishioners-modal',
    component: ParishionersModalComponent,
  },
  {
    path: 'clergy-types-modal',
    component: ClergyTypesModalComponent,
  },
  {
    path: 'worshipplaces-modal',
    component: WorshipplacesModalComponent,
  },
  {
    path: 'priests-modal',
    component: PriestsModalComponent,
  },
  {
    path: 'places-modal',
    component: PlacesModalComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-persons-modal',
    component: PersonsFormComponent,
    children: formChildren,
  },
  {
    path: 'quick-insert-countries-modal',
    component: CountriesFormComponent,
    children: formChildren,
  },
  {
    path: 'quick-insert-chapelries-modal',
    component: ChapelriesFormComponent,
    children: [
      {
        path: 'chapelries-modal',
        component: ChapelriesModalComponent,
      },
      {
        path: 'persons-modal',
        component: PersonsModalComponent,
      },
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
    component: PriestsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Priest' },
    children: [
      {
        path: 'new',
        component: PriestsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: PriestsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: PriestsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: PriestsDeleteComponent,
      },
      {
        path: ':id/details',
        component: PriestsDetailsComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      ...formChildren
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriestsRoutingModule {}
