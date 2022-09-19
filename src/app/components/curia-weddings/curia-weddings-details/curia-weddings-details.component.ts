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
import { Observable } from 'rxjs';

import { CuriaWedding } from '../curia-wedding.model';
import * as actions from '../reducers/curia-weddings.actions';
import { getCuriaWedding } from '../reducers/curia-weddings.selectors';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { CuriaWeddingsService } from '@peakitpt/ui-kyrios-api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-curia-weddings-details',
  templateUrl: './curia-weddings-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaWeddingsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaWedding>;
  model: CuriaWedding;
  returnUrl = '/curia-weddings';
  modulePath = 'curia-weddings';
  viewName = 'CuriaWedding';

  // Selectors & actions
  selectorGetModel = getCuriaWedding;
  actionRequestFail = actions.CuriaWeddingsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.CuriaWeddingsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.CuriaWeddingsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  @ViewChild('curiaWeddingTabTemplate')
  curiaWeddingTabTemplate: TemplateRef<any>;
  @ViewChild('groomsTabTemplate') groomsTabTemplate: TemplateRef<any>;
  @ViewChild('seatDuplicateTabTemplate')
  seatDuplicateTabTemplate: TemplateRef<any>;
  @ViewChild('mod1TabTemplate') mod1TabTemplate: TemplateRef<any>;
  @ViewChild('mod2TabTemplate') mod2TabTemplate: TemplateRef<any>;
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
    private service: CuriaWeddingsService
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
    super.afterGetModel();
    this.addTabs();
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

    if (this.id) {
      this.headerOptionsMenu = [
        {
          name: this.i18nextPipe.transform(`${this.modulePath}:action.approve`),
          value: 'approve_curia_wedding',
          icon: 'check_circle',
        },
        {
          name: this.i18nextPipe.transform(
            `${this.modulePath}:action.wait_docs`
          ),
          value: 'wait_docs_curia_wedding',
          icon: 'pending_actions',
        },
        {
          name: this.i18nextPipe.transform(`${this.modulePath}:action.reject`),
          value: 'reject_curia_wedding',
          icon: 'cancel',
        },
        ...this.headerOptionsMenu,
      ];
    }
  }

  menuClick(event: any, data: any) {
    switch (event) {
      case 'generate_doc':
        this.modal.close();
        this.navigate(`/${this.modulePath}/${this.id}/emit_document`);
        break;
      case 'view_doc':
        this.openDetails('documents', this.model.receipt_id);
        break;
      case 'download_doc':
        if (this.model.receipt_id) {
          window.open(
            `${environment.railsAppUrl}/documents/${this.model.receipt_id}/printpdf?format=pdf&file=documento`,
            '_blank'
          );
        }
        break;
      case 'approve_curia_wedding':
        this.subs.push(
          this.service.approveWedding(this.model).subscribe(
            (r) => {
              this.store.dispatch(new this.actionRequestGetOne(this.id));
            },
            (err) => {
              this.snackBarService.openSnackBar(
                this.i18nextPipe.transform(
                  this.modulePath + ':message.finalize_wedding_error'
                ),
                this.sharedModule.ERROR_COLOR
              );
            }
          )
        );
        break;
      case 'reject_curia_wedding':
        this.subs.push(
          this.service.rejectWedding(this.model).subscribe(
            (r) => {
              this.store.dispatch(new this.actionRequestGetOne(this.id));
            },
            (err) => {
              this.snackBarService.openSnackBar(
                this.i18nextPipe.transform(
                  this.modulePath + ':message.finalize_wedding_error'
                ),
                this.sharedModule.ERROR_COLOR
              );
            }
          )
        );
        break;
      case 'wait_docs_curia_wedding':
        this.subs.push(
          this.service.weddingWaitingForDocs(this.model).subscribe(
            (r) => {
              this.store.dispatch(new this.actionRequestGetOne(this.id));
            },
            (err) => {
              this.snackBarService.openSnackBar(
                this.i18nextPipe.transform(
                  this.modulePath + ':message.finalize_wedding_error'
                ),
                this.sharedModule.ERROR_COLOR
              );
            }
          )
        );
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
        templateContent: this.curiaWeddingTabTemplate,
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
          `${this.modulePath}:tabs.attachments_tab`
        ),
        templateContent: this.attachmentsTabTemplate,
      },
    ];
  }

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/curia_weddings/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }

  addTreasuryDocsOptions() {
    if (this.model) {
      if (!this.model.receipt_id) {
        this.treasuryDocOptionsMenu = [
          {
            icon: 'note_add',
            name: this.i18nextPipe.transform(
              'documents:action.treasury_doc.generate_doc'
            ),
            value: 'generate_doc',
          },
        ];
      } else {
        this.treasuryDocOptionsMenu = [
          {
            icon: 'visibility',
            name: this.i18nextPipe.transform(
              'documents:action.treasury_doc.view_doc'
            ),
            value: 'view_doc',
          },
          {
            icon: 'download',
            name: this.i18nextPipe.transform(
              'documents:action.treasury_doc.download_doc'
            ),
            value: 'download_doc',
          },
        ];
      }
    }
  }
}
