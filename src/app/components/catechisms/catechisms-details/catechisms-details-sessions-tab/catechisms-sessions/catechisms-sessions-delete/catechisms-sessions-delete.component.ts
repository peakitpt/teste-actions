import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';

import { CatechismSession } from '../../../../catechism.model';
import {
  getSelectedSessions,
  getSession,
} from '../../../../reducers/catechisms.selectors';
import * as actions from '../../../../reducers/catechisms.actions';

@Component({
  selector: 'kyr-catechisms-sessions-delete',
  templateUrl: './catechisms-sessions-delete.component.html',
})
export class CatechismsSessionsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<CatechismSession[]>;
  modelList: CatechismSession[] = [];
  modulePath = 'catechisms';

  confirmDelete: boolean = false;

  @Output() emitModalClose = new EventEmitter();

  selectorGetModel = getSession;
  selectorGetSelected = getSelectedSessions;
  actionRequestFail = actions.CatechismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAllSessions;
  actionRequestGetOne = actions.RequestGetSession;
  actionRequestDelete = actions.RequestDeleteSession;
  actionSuccessDelete = actions.CatechismsActionTypes.SuccessDeleteSession;
  actionSetSelected = actions.SetSelectedSession;

  ngOnInit() {
    this.isLoading = true;

    this.modelList$ = this.store.select(this.selectorGetSelected);
    this.subs.push(
      this.modelList$.subscribe((modelList: any[]) => {
        this.modelList = modelList;
        if (modelList && modelList.length) {
          this.isLoading = false;
        }
      })
    );
  }

  onDeleteSuccess(_closeAll: boolean, _deleteSuccessMsg: string) {
    super.onDeleteSuccess(
      false,
      `${this.modulePath}:message.delete_session_success`
    );
  }

  modalClose() {
    this.emitModalClose.emit(this.confirmDelete);
  }

  delete() {
    this.confirmDelete = true;
    this.isSaving = true;

    this.modelList.forEach((session: CatechismSession) =>
      this.store.dispatch(
        new this.actionRequestDelete({
          catechismId: session.catechism_id,
          id: session.id,
        })
      )
    );
  }
}
