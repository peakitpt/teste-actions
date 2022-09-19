import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BishopricsListComponent } from './bishoprics-list/bishoprics-list.component';
import { BishopricsFormComponent } from './bishoprics-form/bishoprics-form.component';
import { ReportsGroupsModalComponent } from 'src/app/shared/components/modals/reports-groups-modal/reports-groups-modal.component';
import { CountriesModalComponent } from 'src/app/shared/components/modals/countries-modal/countries-modal.component';
import { BishopricsDetailsComponent } from './bishoprics-details/bishoprics-details.component';
import { BishopricsDeleteComponent } from './bishoprics-delete/bishoprics-delete.component';

const formChildren: Routes = [
  {
    path: 'reports-groups-modal',
    component: ReportsGroupsModalComponent
  },
  {
    path: 'countries-modal',
    component: CountriesModalComponent
  },
  {
    path: 'delete',
    component: BishopricsDeleteComponent
  }
];
const routes: Routes = [
  {
    path: '',
    component: BishopricsListComponent,
    // canActivate: [PermissionGuard],
    data: { view: 'Bishopric' },
    children: [
      {
        path: 'new',
        component: BishopricsFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: BishopricsFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: BishopricsFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: BishopricsDeleteComponent
      },
      {
        path: ':id/details',
        component: BishopricsDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BishopricsRoutingModule {}
