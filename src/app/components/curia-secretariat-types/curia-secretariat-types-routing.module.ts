import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { CuriaSecretariatTypesListComponent } from './curia-secretariat-types-list/curia-secretariat-types-list.component';
import { CuriaSecretariatTypesDeleteComponent } from './curia-secretariat-types-delete/curia-secretariat-types-delete.component';
import { CuriaSecretariatTypesDetailsComponent } from './curia-secretariat-types-details/curia-secretariat-types-details.component';
import { CuriaSecretariatTypesFormComponent } from './curia-secretariat-types-form/curia-secretariat-types-form.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CuriaSecretariatTypesDeleteComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: CuriaSecretariatTypesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'CuriaSecretariatType' },
    children: [
      {
        path: 'new',
        component: CuriaSecretariatTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/duplicate',
        component: CuriaSecretariatTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/edit',
        component: CuriaSecretariatTypesFormComponent,
        children: formChildren,
      },
      {
        path: ':id/delete',
        component: CuriaSecretariatTypesDeleteComponent,
      },
      {
        path: ':id/details',
        component: CuriaSecretariatTypesDetailsComponent,
        children: formChildren,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuriaSecretariatTypesRoutingModule {}
