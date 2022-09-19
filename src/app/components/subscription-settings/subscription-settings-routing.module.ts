import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { DocumentsTypesModalComponent } from 'src/app/shared/components/modals/documents-types-modal/documents-types-modal.component';
import { InstitutionsModalComponent } from 'src/app/shared/components/modals/institutions-modal/institutions-modal.component';
import { NewslettersLayoutsModalComponent } from 'src/app/shared/components/modals/newsletters-layouts-modal/newsletters-layouts-modal.component';
import { ParishionersModalComponent } from 'src/app/shared/components/modals/parishioners-modal/parishioners-modal.component';
import { SubscriptionSettingsFormComponent } from './subscription-settings-form/subscription-settings-form.component';

const formChildren: Routes = [
  {
    path: 'parishioners-modal',
    component: ParishionersModalComponent,
  },
  {
    path: 'documents-types-modal',
    component: DocumentsTypesModalComponent,
  },
  {
    path: 'newsletters-layouts-modal',
    component: NewslettersLayoutsModalComponent,
  },
  {
    path: 'institutions-modal',
    component: InstitutionsModalComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: SubscriptionSettingsFormComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Reportmanagment' },
    children: formChildren,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionSettingsRoutingModule {}
