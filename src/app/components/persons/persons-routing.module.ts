import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonsDetailsComponent } from './persons-details/persons-details.component';
import { PersonsFormComponent } from './persons-form/persons-form.component';
import { PersonsDeleteComponent } from './persons-delete/persons-delete.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { CuriaFunctionsModalComponent } from 'src/app/shared/components/modals/curia-functions-modal/curia-functions-modal.component';
import { PlacesModalComponent } from 'src/app/shared/components/modals/places-modal/places-modal.component';
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { PriestsModalComponent } from 'src/app/shared/components/modals/priests-modal/priests-modal.component';
import { PersonsFormGroupsTabToggleComponent } from './persons-form/persons-form-groups-tab/persons-form-groups-tab-toggle/persons-form-groups-tab-toggle.component';

// Quick Insertion
import { CountriesFormComponent } from '../countries/countries-form/countries-form.component';
import { ChapelriesFormComponent } from '../chapelries/chapelries-form/chapelries-form.component';
import { ArchpristshipsModalComponent } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.component';
import { PatronsModalComponent } from 'src/app/shared/components/modals/patrons-modal/patrons-modal.component';
import { WorshipplacesFormComponent } from '../worshipplaces/worshipplaces-form/worshipplaces-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: PersonsDeleteComponent,
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
    path: 'worshipplaces-modal',
    component: WorshipplacesModalComponent,
  },
  {
    path: 'curia-functions-modal',
    component: CuriaFunctionsModalComponent,
  },
  {
    path: 'places-modal',
    component: PlacesModalComponent,
  },
  {
    path: 'persons-modal',
    component: PersonsModalComponent,
  },
  {
    path: 'priests-modal',
    component: PriestsModalComponent,
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
      formChildren[2],
      formChildren[6],
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
  {
    path: 'quick-insert-worshipplaces-modal',
    component: WorshipplacesFormComponent,
    children: formChildren,
  },
];

const routes: Routes = [
  {
    path: '',
    component: PersonsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Parishioner' },
    children: [
      {
        path: 'new',
        component: PersonsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: PersonsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: PersonsFormComponent,
        children: [
          ...formChildren.concat(quickInsertionsChildren),
          {
            path:
              'toggle-newsletter-group-subscription/:newsletter_group_subscription_id',
            component: PersonsFormGroupsTabToggleComponent,
          },
        ],
      },
      {
        path: ':id/delete',
        component: PersonsDeleteComponent,
      },
      {
        path: ':id/details',
        component: PersonsDetailsComponent,
        children: [formChildren[0]],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsRoutingModule {}
