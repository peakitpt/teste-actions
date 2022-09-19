import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountriesDetailsComponent } from './countries-details/countries-details.component';
import { CountriesFormComponent } from './countries-form/countries-form.component';
import { CountriesDeleteComponent } from './countries-delete/countries-delete.component';

const formChildren: Routes = [
  {
    path: 'delete',
    component: CountriesDeleteComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: CountriesListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Country' },
    children: [
      {
        path: 'new',
        component: CountriesFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: CountriesFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: CountriesFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: CountriesDeleteComponent
      },
      {
        path: ':id/details',
        component: CountriesDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {}
