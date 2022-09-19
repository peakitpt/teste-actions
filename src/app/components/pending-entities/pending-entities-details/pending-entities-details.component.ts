import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogComponent } from '@peakitpt/ui-material';
import { Observable } from 'rxjs';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  AcceptPendingEntity,
  PendingEntityEntity,
} from '../pending-entity.model';
import * as actions from '../reducers/pending-entities.actions';
import {
  getAcceptedPendingEntity,
  getPendingEntity,
  getRejectedPendingEntity,
  getSimilarEntity,
} from '../reducers/pending-entities.selectors';
import { TableComponent } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-pending-entities-details',
  templateUrl: './pending-entities-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PendingEntitiesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model: PendingEntityEntity;
  model$: Observable<PendingEntityEntity>;
  returnUrl = '/pending-entities';
  modulePath = 'pending-entities';

  selectorGetModel = getPendingEntity;
  actionRequestGetOne = actions.RequestGet;
  actionRequestFail = actions.PendingEntitiesActionTypes.RequestFail;
  actionRejectOne = actions.RequestRejectPendingEntity;
  actionAcceptOne = actions.RequestAcceptPendingEntity;
  actionRequestGetAll = actions.RequestGetAll;

  actionSimilarEntities = actions.RequestSimilarEntity;

  @ViewChild('table') table: TableComponent;
  @ViewChild('rejectReasonModal') rejectReasonModal: DialogComponent;
  @ViewChild('similarEntitiesModal')
  similarEntitiesModal: DialogComponent;

  rejectReasonControl: FormControl = new FormControl();
  similarEntities: any[] = [];
  selectedSimilarEntity: any;

  tableColumns: any[] = [];

  afterGetModel(): void {
    super.afterGetModel();
    this.getSimilarPendingEntities();
    this.buildTableColumns();
    this.rejectReasonControl.setValue(this.model.reject_reason);
  }

  openRejectReasonModal() {
    this.rejectReasonModal.open();
  }

  openSimilarEntitiesModal() {
    this.similarEntitiesModal.open();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'email',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.email`),
      },
      {
        id: 'sex',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.sex`),
      },
    ];
  }

  getSimilarPendingEntities() {
    const similarEntities = this.store.select(getSimilarEntity);
    this.subs.push(
      similarEntities.subscribe((entities: any) => {
        if (entities) {
          this.similarEntities = entities;
        }
      })
    );
    this.store.dispatch(
      new this.actionSimilarEntities({
        id: this.model.id,
      } as PendingEntityEntity)
    );
  }

  getSelectedRow() {
    this.selectedSimilarEntity = this.table.currentlySelectedRow;
  }

  keepData() {
    this.accept({
      id: this.model.id,
      existing_entity_id: this.selectedSimilarEntity.id,
      update_existing_entity: false,
    });
    this.similarEntitiesModal.close();
  }

  updateData() {
    this.accept({
      id: this.model.id,
      existing_entity_id: this.selectedSimilarEntity.id,
      update_existing_entity: true,
    });
    this.similarEntitiesModal.close();
  }

  createNewEntity() {
    this.accept({
      id: this.model.id,
    });
    this.similarEntitiesModal.close();
  }

  handleAccept() {
    if (this.similarEntities && this.similarEntities.length > 0) {
      this.similarEntitiesModal.open();
    } else {
      this.accept({
        id: this.model.id,
      } as AcceptPendingEntity);
    }
  }

  accept(options: AcceptPendingEntity = {}) {
    //aceitar
    const acceptPendingEntity = this.store.select(getAcceptedPendingEntity);
    this.subs.push(
      acceptPendingEntity.subscribe((model: any) => {
        if (model && model.id === this.model.id) {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(`${this.modulePath}:action.successful`),
            this.sharedModule.SUCCESS_COLOR
          );
          this.store.dispatch(new this.actionRequestGetAll()); //refresh list
          this.modal.close(); //close details
        }
      })
    );
    this.store.dispatch(new this.actionAcceptOne(options));
  }

  reject() {
    const rejectedPendingEntity = this.store.select(getRejectedPendingEntity);
    this.subs.push(
      rejectedPendingEntity.subscribe((model: any) => {
        if (
          model &&
          model.reject_reason === this.rejectReasonControl.value &&
          model.id === this.model.id
        ) {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(`${this.modulePath}:action.successful`),
            this.sharedModule.SUCCESS_COLOR
          );
          this.rejectReasonModal.close();
          this.store.dispatch(new this.actionRequestGetAll()); //refresh list
          this.modal.close(); //close details
        }
      })
    );
    this.store.dispatch(
      new this.actionRejectOne({
        id: this.model.id,
        reject_reason: this.rejectReasonControl.value,
      } as PendingEntityEntity)
    );
  }
}
