import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CuriaAdministrativeProcessesListComponent } from './curia-administrative-processes-list/curia-administrative-processes-list.component';
import { CuriaAdministrativeProcessesDetailsComponent } from './curia-administrative-processes-details/curia-administrative-processes-details.component';
import { CuriaAdministrativeProcessesFormComponent } from './curia-administrative-processes-form/curia-administrative-processes-form.component';
import { CuriaAdministrativeProcessesDeleteComponent } from './curia-administrative-processes-delete/curia-administrative-processes-delete.component';
import { CuriaAdministrativeProcessTypesModalComponent } from 'src/app/shared/components/modals/curia-administrative-process-types-modal/curia-administrative-process-types-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { PriestsV1ModalComponent } from 'src/app/shared/components/modals/priests-v1-modal/priests-v1-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { DocumentsTypesModalComponent } from 'src/app/shared/components/modals/documents-types-modal/documents-types-modal.component';
import { PersonsFormComponent } from '../persons/persons-form/persons-form.component';
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { CuriaAdministrativeProcessesEmitDocumentsComponent } from './curia-administrative-processes-emit-documents/curia-administrative-processes-emit-documents.component';
import { CuriaAdministrativeProcessTypesFormComponent } from '../curia-administrative-process-types/curia-administrative-process-types-form/curia-administrative-process-types-form.component';
import { ChapelriesFormComponent } from '../chapelries/chapelries-form/chapelries-form.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { EmolumentsFormComponent } from '../emoluments/emoluments-form/emoluments-form.component';
import { ArchpristshipsModalComponent } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaAdministrativeProcessesDeleteComponent,
  },
  {
    path: 'curia-administrative-process-types-modal',
    component: CuriaAdministrativeProcessTypesModalComponent,
  },
  {
    path: 'quick-insert-curia-administrative-process-types-modal',
    component: CuriaAdministrativeProcessTypesFormComponent,
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
];

const routes: Routes = [
  {
    path: '',
    component: CuriaAdministrativeProcessesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaAdministrativeProcess' },
    children: [
      {
        path: 'new',
        component: CuriaAdministrativeProcessesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: CuriaAdministrativeProcessesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: CuriaAdministrativeProcessesFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: CuriaAdministrativeProcessesDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaAdministrativeProcessesDetailsComponent,
        children: formChildren,
      },
      ...formChildren,
      {
        path: ':id/emit_document',
        component: CuriaAdministrativeProcessesEmitDocumentsComponent,
        children: documentsFormChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaAdministrativeProcessesRoutingModule {}
