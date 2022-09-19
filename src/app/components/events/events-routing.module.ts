import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/auth/permission.guard';

import { EventsListComponent } from './events-list/events-list.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { EventsFormComponent } from './events-form/events-form.component';
import { EventsDeleteComponent } from './events-delete/events-delete.component';
import { ContentsModalComponent } from './../../shared/components/modals/contents-modal/contents-modal.component';
import { PersonsModalComponent } from 'src/app/shared/components/modals/persons-modal/persons-modal.component';

const formChildren: Routes = [
  {
    path: 'contents-modal',
    component: ContentsModalComponent
  },
  {
    path: 'persons-modal',
    component: PersonsModalComponent
  },
  {
    path: 'delete',
    component: EventsDeleteComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
    canActivate: [PermissionGuard],
    data: { view: 'Event' },
    children: [
      {
        path: 'new',
        component: EventsFormComponent,
        children: formChildren
      },
      {
        path: ':id/duplicate',
        component: EventsFormComponent,
        children: formChildren
      },
      {
        path: ':id/edit',
        component: EventsFormComponent,
        children: formChildren
      },
      {
        path: ':id/delete',
        component: EventsDeleteComponent
      },
      {
        path: ':id/details',
        component: EventsDetailsComponent,
        children: formChildren
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
