import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CuriaMinistriesAndOrdersListComponent } from './curia-ministries-and-orders-list/curia-ministries-and-orders-list.component';
import { CuriaMinistriesAndOrdersDetailsComponent } from './curia-ministries-and-orders-details/curia-ministries-and-orders-details.component';
import { CuriaMinistriesAndOrdersFormComponent } from './curia-ministries-and-orders-form/curia-ministries-and-orders-form.component';
import { CuriaMinistriesAndOrdersDeleteComponent } from './curia-ministries-and-orders-delete/curia-ministries-and-orders-delete.component';
import { CuriaFunctionsModalComponent } from 'src/app/shared/components/modals/curia-functions-modal/curia-functions-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { PriestsV1ModalComponent } from 'src/app/shared/components/modals/priests-v1-modal/priests-v1-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { DocumentsTypesModalComponent } from 'src/app/shared/components/modals/documents-types-modal/documents-types-modal.component';
import { PersonsFormComponent } from '../persons/persons-form/persons-form.component';
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';
import { CuriaMinistriesAndOrdersEmitDocumentsComponent } from './curia-ministries-and-orders-emit-documents/curia-ministries-and-orders-emit-documents.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaMinistriesAndOrdersDeleteComponent,
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
    component: CuriaMinistriesAndOrdersListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaMinistriesAndOrder' },
    children: [
      {
        path: 'new',
        component: CuriaMinistriesAndOrdersFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: CuriaMinistriesAndOrdersFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: CuriaMinistriesAndOrdersFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: CuriaMinistriesAndOrdersDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaMinistriesAndOrdersDetailsComponent,
        children: formChildren,
      },
      ...formChildren,
      {
        path: ':id/emit_document',
        component: CuriaMinistriesAndOrdersEmitDocumentsComponent,
        children: documentsFormChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaMinistriesAndOrdersRoutingModule {}
