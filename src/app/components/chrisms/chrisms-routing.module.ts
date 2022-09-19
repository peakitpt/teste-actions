import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { ChrismsListComponent } from './chrisms-list/chrisms-list.component';
import { ChrismsDeleteComponent } from './chrisms-delete/chrisms-delete.component';
import { ChrismsDetailsComponent } from './chrisms-details/chrisms-details.component';
import { ChrismsFormComponent } from './chrisms-form/chrisms-form.component';

// Modals
import { PriestsAndPersonsModalComponent } from 'src/app/shared/components/modals/priests-and-persons-modal/priests-and-persons-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';

// Quick insertions
import { PersonsFormComponent } from '../persons/persons-form/persons-form.component';
import { WorshipplacesFormComponent } from '../worshipplaces/worshipplaces-form/worshipplaces-form.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { EmolumentsFormComponent } from '../emoluments/emoluments-form/emoluments-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: ChrismsDeleteComponent,
  },
  {
    path: 'priests-and-persons-modal',
    component: PriestsAndPersonsModalComponent,
  },
  {
    path: 'worshipplaces-modal',
    component: WorshipplacesModalComponent,
  },
  {
    path: 'persons-modal',
    component: PersonsModalComponent,
  },
  {
    path: 'emoluments-modal',
    component: EmolumentsModalComponent,
  },
  {
    path: 'parishioners-modal',
    component: ParishionersModalComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-persons-modal',
    component: PersonsFormComponent,
    children: [
      {
        path: 'countries-modal',
        component: CountriesModalComponent,
      },
      {
        path: 'persons-modal',
        component: PersonsModalComponent,
      },
      {
        path: 'chapelries-modal',
        component: ChapelriesModalComponent,
      },
      {
        path: 'worshipplaces-modal',
        component: WorshipplacesModalComponent,
      },
    ],
  },
  {
    path: 'quick-insert-worshipplaces-modal',
    component: WorshipplacesFormComponent,
    children: [
      {
        path: 'chapelries-modal',
        component: ChapelriesModalComponent,
      },
    ],
  },
  {
    path: 'quick-insert-emoluments-modal',
    component: EmolumentsFormComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: ChrismsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Chrism' },
    children: [
      {
        path: 'new',
        component: ChrismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: ChrismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: ChrismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: ChrismsDeleteComponent,
      },
      {
        path: ':id/details',
        component: ChrismsDetailsComponent,
        children: [formChildren[0]],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChrismsRoutingModule {}
