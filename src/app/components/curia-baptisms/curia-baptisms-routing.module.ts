import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { CuriaBaptismsListComponent } from './curia-baptisms-list/curia-baptisms-list.component';
import { CuriaBaptismsDeleteComponent } from './curia-baptisms-delete/curia-baptisms-delete.component';
import { CuriaBaptismsDetailsComponent } from './curia-baptisms-details/curia-baptisms-details.component';
import { CuriaBaptismsFormComponent } from './curia-baptisms-form/curia-baptisms-form.component';

// Modals
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { PriestsAndPersonsModalComponent } from 'src/app/shared/components/modals/priests-and-persons-modal/priests-and-persons-modal.component';
import { PriestsModalComponent } from 'src/app/shared/components/modals/priests-modal/priests-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { ArchpristshipsModalComponent } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';

// Quick insertions
import { PersonsFormComponent } from 'src/app/components/persons/persons-form/persons-form.component';
import { WorshipplacesFormComponent } from 'src/app/components/worshipplaces/worshipplaces-form/worshipplaces-form.component';
import { ChapelriesFormComponent } from 'src/app/components/chapelries/chapelries-form/chapelries-form.component';
import { EmolumentsFormComponent } from 'src/app/components/emoluments/emoluments-form/emoluments-form.component';
import { DocumentsTypesModalComponent } from 'src/app/shared/components/modals/documents-types-modal/documents-types-modal.component';
import { CuriaBaptismsEmitDocumentsComponent } from './curia-baptisms-emit-documents/curia-baptisms-emit-documents.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaBaptismsDeleteComponent,
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
  {
    path: 'worshipplaces-modal',
    component: WorshipplacesModalComponent,
  },
  {
    path: 'priests-and-persons-modal',
    component: PriestsAndPersonsModalComponent,
  },
  {
    path: 'priests-modal',
    component: PriestsModalComponent,
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
    path: 'quick-insert-emoluments-modal',
    component: EmolumentsFormComponent,
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
    path: 'quick-insert-chapelries-modal',
    component: ChapelriesFormComponent,
    children: [
      {
        path: 'archpristships-modal',
        component: ArchpristshipsModalComponent,
      },
      {
        path: 'worhsipplaces-modal',
        component: WorshipplacesModalComponent,
      },
    ],
  },
];

const documentsFormChildren: Routes = [
  {
    path: 'documents-types-modal',
    component: DocumentsTypesModalComponent,
  },
  {
    path: 'emoluments-modal',
    component: EmolumentsModalComponent,
  },
  {
    path: 'parishioners-modal',
    component: ParishionersModalComponent,
  },
  {
    path: 'quick-insert-persons-modal',
    component: PersonsFormComponent,
    children: [
      {
        path: 'persons-modal',
        component: PersonsModalComponent,
      },
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
    component: CuriaBaptismsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaBaptism' },
    children: [
      {
        path: 'new',
        component: CuriaBaptismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: CuriaBaptismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: CuriaBaptismsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: CuriaBaptismsDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaBaptismsDetailsComponent,
        children: [formChildren[0]],
      },
      ...formChildren,
      {
        path: ':id/emit_document',
        component: CuriaBaptismsEmitDocumentsComponent,
        children: documentsFormChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaBaptismsRoutingModule {}
