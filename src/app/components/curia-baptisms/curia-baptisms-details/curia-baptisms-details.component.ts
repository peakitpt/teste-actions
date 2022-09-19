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

import { CuriaBaptism } from '../curia-baptism.model';
import * as actions from '../reducers/curia-baptisms.actions';
import { getCuriaBaptism } from '../reducers/curia-baptisms.selectors';
import { environment } from 'src/environments/environment';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { CuriaBaptismsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-curia-baptisms-details',
  templateUrl: './curia-baptisms-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaBaptismsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaBaptism>;
  model: CuriaBaptism;
  returnUrl = '/curia-baptisms';
  modulePath = 'curia-baptisms';
  viewName = 'CuriaBaptism';

  // Selectors & actions
  selectorGetModel = getCuriaBaptism;
  actionRequestFail = actions.CuriaBaptismsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.CuriaBaptismsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.CuriaBaptismsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('parentsTabTemplate') parentsTabTemplate: TemplateRef<any>;
  @ViewChild('godparentsTabTemplate') godparentsTabTemplate: TemplateRef<any>;
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
    private service: CuriaBaptismsService
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
      case 'approve_curia_baptism':
        this.subs.push(
          this.service.approveBaptism(this.model).subscribe(
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
      case 'reject_curia_baptism':
        this.subs.push(
          this.service.rejectBaptism(this.model).subscribe(
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
      case 'wait_docs_curia_baptism':
        this.subs.push(
          this.service.baptismWaitingForDocs(this.model).subscribe(
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
          value: 'approve_curia_baptism',
          icon: 'check_circle',
        },
        {
          name: this.i18nextPipe.transform(
            `${this.modulePath}:action.wait_docs`
          ),
          value: 'wait_docs_curia_baptism',
          icon: 'pending_actions',
        },
        {
          name: this.i18nextPipe.transform(`${this.modulePath}:action.reject`),
          value: 'reject_curia_baptism',
          icon: 'cancel',
        },
        ...this.headerOptionsMenu,
      ];
    }
  }

  private addTabs() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.main_tab`
        ),
        templateContent: this.mainTabTemplate,
      },
    ];

    if (
      this.model.entity.entity_person.entity_father_description ||
      this.model.entity.entity_person.entity_mother_description ||
      this.model.entity.entity_person.entity_father?.complete_relation ||
      this.model.entity.entity_person.entity_mother?.complete_relation ||
      this.model.entity.entity_person.entity_mother?.entity_person.entity_father
        ?.complete_relation ||
      this.model.entity.entity_person.entity_mother?.entity_person.entity_mother
        ?.complete_relation ||
      this.model.entity.entity_person.entity_father?.entity_person.entity_father
        ?.complete_relation ||
      this.model.entity.entity_person.entity_father?.entity_person.entity_mother
        ?.complete_relation
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.parents_grandparents`
        ),
        templateContent: this.parentsTabTemplate,
      });
    }

    if (
      this.model.entity_godfather_description ||
      this.model.entity_godmother_description
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.godparents`
        ),
        templateContent: this.godparentsTabTemplate,
      });
    }

    if (this.model.curia_baptisms_attachments.length) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments`
        ),
        templateContent: this.attachmentsTabTemplate,
      });
    }
  }

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/curia_baptisms/${
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
