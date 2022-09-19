import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Catechism, CatechismSession } from '../../../../catechism.model';
import * as actions from '../../../../reducers/catechisms.actions';
import { getSession } from '../../../../reducers/catechisms.selectors';

@Component({
  selector: 'kyr-catechisms-sessions-details',
  templateUrl: './catechisms-sessions-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatechismsSessionsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CatechismSession>;
  returnUrl = '/catechisms';
  modulePath = 'catechisms';
  viewName = 'CatechismsSession';

  selectorGetModel = getSession;
  actionRequestFail = actions.CatechismsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGetSession;

  @Input() catechismId: number;
  @Input() sessionId: number;
  @Input() finalized: boolean;
  @Output() emitModalClose = new EventEmitter();

  isSessionDeleteOpen = false;
  openSessionEdit = false;
  duplicateMode = false;

  ngOnInit() {
    if (!this.finalized) {
      this.buildHeaderOptionsMenu();
    }

    this.model$ = this.store.select(this.selectorGetModel);
    this.store.dispatch(
      new this.actionRequestGetOne({
        catechismId: this.catechismId,
        id: this.sessionId,
      })
    );
  }

  modalClose() {
    this.emitModalClose.emit({
      openSessionEdit: this.openSessionEdit,
      duplicateMode: this.duplicateMode,
    });
  }

  menuClick(event: any, data: Catechism) {
    switch (event) {
      case 'edit':
      case 'duplicate':
        this.duplicateMode = event === 'duplicate' && data?.id != null;
        this.openSessionEdit = true;
        this.modal.close();
        break;
      case 'delete':
        this.store.dispatch(new actions.SetSelectedSession([data]));
        this.isSessionDeleteOpen = true;
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  closeSessionDeleteModal(confirmDelete: boolean) {
    this.isSessionDeleteOpen = false;
    if (confirmDelete) {
      this.modal.close();
    }
  }
}
