import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { MassIntentionsListComponent } from './mass-intentions-list/mass-intentions-list.component';
import { MassIntentionsDeleteComponent } from './mass-intentions-delete/mass-intentions-delete.component';
import { MassIntentionsDetailsComponent } from './mass-intentions-details/mass-intentions-details.component';
import { MassIntentionsFormComponent } from './mass-intentions-form/mass-intentions-form.component';
import { PriestsAndPersonsModalComponent } from 'src/app/shared/components/modals/priests-and-persons-modal/priests-and-persons-modal.component';
import { WorshipplacesModalComponent } from 'src/app/shared/components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { EmolumentsModalComponent } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';

// Quick Insertion
import { WorshipplacesFormComponent } from '../worshipplaces/worshipplaces-form/worshipplaces-form.component';
import { EmolumentsFormComponent } from '../emoluments/emoluments-form/emoluments-form.component';
import { ChapelriesModalComponent } from 'src/app/shared/components/modals/chapelries-modal/chapelries-modal.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: MassIntentionsDeleteComponent,
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
    component: MassIntentionsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'MassIntention' },
    children: [
      {
        path: 'new',
        component: MassIntentionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/duplicate',
        component: MassIntentionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/edit',
        component: MassIntentionsFormComponent,
        children: formChildren.concat(quickInsertionsChildren),
      },
      {
        path: ':id/delete',
        component: MassIntentionsDeleteComponent,
      },
      {
        path: ':id/details',
        component: MassIntentionsDetailsComponent,
        children: [formChildren[0]],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MassIntentionsRoutingModule {}
