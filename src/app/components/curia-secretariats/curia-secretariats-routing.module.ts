import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CuriaSecretariatsListComponent } from './curia-secretariats-list/curia-secretariats-list.component';
import { CuriaSecretariatsDetailsComponent } from './curia-secretariats-details/curia-secretariats-details.component';
import { CuriaSecretariatsFormComponent } from './curia-secretariats-form/curia-secretariats-form.component';
import { CuriaSecretariatsDeleteComponent } from './curia-secretariats-delete/curia-secretariats-delete.component';
import { CuriaFunctionsModalComponent } from 'src/app/shared/components/modals/curia-functions-modal/curia-functions-modal.component';
import { CuriaSecretariatTypesModalComponent } from 'src/app/shared/components/modals/curia-secretariat-types-modal/curia-secretariat-types-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { PriestsV1ModalComponent } from 'src/app/shared/components/modals/priests-v1-modal/priests-v1-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { DocumentsTypesModalComponent } from 'src/app/shared/components/modals/documents-types-modal/documents-types-modal.component';
import { PersonsFormComponent } from '../persons/persons-form/persons-form.component';
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { CuriaSecretariatsEmitDocumentsComponent } from './curia-secretariats-emit-documents/curia-secretariats-emit-documents.component';
import { EmolumentsFormComponent } from '../emoluments/emoluments-form/emoluments-form.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaSecretariatsDeleteComponent,
  },
  {
    path: 'curia-functions-modal',
    component: CuriaFunctionsModalComponent,
  },
  {
    path: 'curia-secretariat-types-modal',
    component: CuriaSecretariatTypesModalComponent,
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
    path: 'priests-v1-modal',
    component: PriestsV1ModalComponent,
  },
];

const quickInsertionsChildren: Routes = [
  {
    path: 'quick-insert-emoluments-modal',
    component: EmolumentsFormComponent,
  },
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
    component: CuriaSecretariatsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaSecretariat' },
    children: [
      {
        path: 'new',
        component: CuriaSecretariatsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: CuriaSecretariatsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: CuriaSecretariatsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: CuriaSecretariatsDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaSecretariatsDetailsComponent,
        children: formChildren,
      },
      ...formChildren,
      {
        path: ':id/emit_document',
        component: CuriaSecretariatsEmitDocumentsComponent,
        children: documentsFormChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaSecretariatsRoutingModule {}
