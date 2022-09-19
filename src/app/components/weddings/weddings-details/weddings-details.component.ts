import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Wedding } from '../wedding.model';
import * as actions from '../reducers/weddings.actions';
import { getWedding } from '../reducers/weddings.selectors';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { WeddingsService } from '@peakitpt/ui-kyrios-api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-weddings-details',
  templateUrl: './weddings-details.component.html',
  styleUrls: ['./weddings-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeddingsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Wedding>;
  model: Wedding;
  returnUrl = '/weddings';
  modulePath = 'weddings';
  viewName = 'Wedding';

  // Selectors & actions
  selectorGetModel = getWedding;
  actionRequestFail = actions.WeddingsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.WeddingsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.WeddingsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  warnings = [];

  @ViewChild('finalizeWeddingModal') finalizeWeddingModal: DialogComponent;
  @ViewChild('weddingTabTemplate') weddingTabTemplate: TemplateRef<any>;
  @ViewChild('groomsTabTemplate') groomsTabTemplate: TemplateRef<any>;
  @ViewChild('seatDuplicateTabTemplate')
  seatDuplicateTabTemplate: TemplateRef<any>;
  @ViewChild('mod1TabTemplate') mod1TabTemplate: TemplateRef<any>;
  @ViewChild('mod2TabTemplate') mod2TabTemplate: TemplateRef<any>;
  @ViewChild('reportsTabTemplate') reportsTabTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    private service: WeddingsService
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      matDialog,
      i18nextPipe,
      http,
      actionSubject,
      snackBarService
    );
  }

  afterGetModel() {
    console.log('after get model');
    console.log('model - ', this.model);
    super.afterGetModel();
    this.addTabs();
    this.getWarnings();
    this.buildHeaderOptionsMenu();
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
    ];

    if (this.model && this.visibleFinalize(this.model)) {
      this.headerOptionsMenu.unshift({
        name: this.i18nextPipe.transform(
          this.modulePath + ':action.finalize_wedding'
        ),
        value: 'finalize_wedding',
        icon: 'send',
      });
    }
  }

  menuClick(event: any, data: any) {
    switch (event) {
      case 'finalize_wedding':
        this.openFinalizeWeddingModal();
        break;
      case 'generate_doc':
        this.modal.close();
        this.navigate(`/${this.modulePath}/${this.id}/emit_document`);
        break;
      case 'view_doc':
        this.openDetails('documents', this.model.document_id);
        break;
      case 'download_doc':
        if (this.model.document_id) {
          window.open(
            `${environment.railsAppUrl}/documents/${this.model.document_id}/printpdf?format=pdf&file=documento`,
            '_blank'
          );
        }
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  private addTabs() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.wedding_tab`
        ),
        templateContent: this.weddingTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.grooms_tab`
        ),
        templateContent: this.groomsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.seatDuplicate_tab`
        ),
        templateContent: this.seatDuplicateTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.mod1_tab`
        ),
        templateContent: this.mod1TabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.mod2_tab`
        ),
        templateContent: this.mod2TabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.reports_tab`
        ),
        templateContent: this.reportsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments_tab`
        ),
        templateContent: this.attachmentsTabTemplate,
      },
    ];
  }

  private getWarnings() {
    console.log('getting warnings');
    const warningSubscription: Subscription = this.service
      .getWarnings(this.id)
      .subscribe(
        (r) => {
          this.warnings = r.warnings;
          warningSubscription.unsubscribe();
        },
        (err) => {
          warningSubscription.unsubscribe();
        }
      );
  }

  // FINALIZE WEDDING FUNCTIONS
  private openFinalizeWeddingModal() {
    if (this.finalizeWeddingModal) {
      this.finalizeWeddingModal.open();
    }
  }

  cancelFinalizeWedding() {
    this.finalizeWeddingModal.close();
  }

  visibleFinalize(model: Wedding): boolean {
    if (+localStorage.getItem('subscriptionTypeId') !== 2) {
      return false;
    }
    return (
      model &&
      (model.curia_status === 'approved' || model.curia_status === null)
    );
  }

  finalizeWedding(updateStatus: boolean = false) {
    this.subs.push(
      this.service.finalizeProcess(this.model, updateStatus).subscribe(
        (r) => {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              this.modulePath + ':message.finalize_wedding_success'
            ),
            this.sharedModule.SUCCESS_COLOR
          );
          this.finalizeWeddingModal.close();
          this.store.dispatch(new this.actionRequestGetOne(this.id));
        },
        (err) => {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              this.modulePath + ':message.finalize_wedding_error'
            ),
            this.sharedModule.ERROR_COLOR
          );
          this.finalizeWeddingModal.close();
        }
      )
    );
  }
}
