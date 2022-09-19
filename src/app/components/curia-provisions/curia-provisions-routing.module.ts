import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CuriaProvisionsListComponent } from './curia-provisions-list/curia-provisions-list.component';
import { CuriaProvisionsDetailsComponent } from './curia-provisions-details/curia-provisions-details.component';
import { CuriaProvisionsFormComponent } from './curia-provisions-form/curia-provisions-form.component';
import { CuriaProvisionsDeleteComponent } from './curia-provisions-delete/curia-provisions-delete.component';
import { CuriaFunctionsModalComponent } from 'src/app/shared/components/modals/curia-functions-modal/curia-functions-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { PriestsV1ModalComponent } from 'src/app/shared/components/modals/priests-v1-modal/priests-v1-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { DocumentsTypesModalComponent } from 'src/app/shared/components/modals/documents-types-modal/documents-types-modal.component';
import { PersonsFormComponent } from '../persons/persons-form/persons-form.component';
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { CuriaProvisionsEmitDocumentsComponent } from './curia-provisions-emit-documents/curia-provisions-emit-documents.component';
import { EmolumentsFormComponent } from '../emoluments/emoluments-form/emoluments-form.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';
import { CuriaProvisionTypesModalComponent } from 'src/app/shared/components/modals/curia-provision-types-modal/curia-provision-types-modal.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaProvisionsDeleteComponent,
  },
  {
    path: 'curia-functions-modal',
    component: CuriaFunctionsModalComponent,
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
    path: 'chapelries-modal',
    component: ChapelriesModalComponent,
  },
  {
    path: 'priests-v1-modal',
    component: PriestsV1ModalComponent,
  },
  {
    path: 'curia-provision-types-modal',
    component: CuriaProvisionTypesModalComponent,
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
    component: CuriaProvisionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaProvision' },
    children: [
      {
        path: 'new',
        component: CuriaProvisionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: CuriaProvisionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: CuriaProvisionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: CuriaProvisionsDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaProvisionsDetailsComponent,
        children: formChildren,
      },
      ...formChildren,
      {
        path: ':id/emit_document',
        component: CuriaProvisionsEmitDocumentsComponent,
        children: documentsFormChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaProvisionsRoutingModule {}
