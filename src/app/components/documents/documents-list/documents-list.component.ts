import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DocumentsService } from '@peakitpt/ui-kyrios-api';

import {
  getDocumentsList,
  getDocumentsListEntirely,
} from '../reducers/documents.selectors';
import { getSelectedDocuments } from './../reducers/documents.selectors';
import * as actions from '../reducers/documents.actions';
import { DocumentResponse, Document } from '../document.model';
import { SubscriptionSettingsV2Service } from '@peakitpt/ui-kyrios-api';
import { SubscriptionSetting } from '../../subscription-settings/subscription-setting.model';
import * as moment from 'moment';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-documents-list',
  templateUrl: './documents-list.component.html',
})
export class DocumentsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'treasury';
  modulePath = 'documents';
  viewName = 'Document';
  modelList$: Observable<DocumentResponse>;
  selectedRows$: Observable<Document[]>;

  selectorGetList = getDocumentsList;
  selectorGetSelected = getSelectedDocuments;
  selectorGetListEntirely = getDocumentsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('paidTemplate') paidTemplate: TemplateRef<any>;
  @ViewChild('documentDateTemplate') documentDateTemplate: TemplateRef<any>;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;
  @ViewChild('model25WarningModal') model25WarningModal: DialogComponent;
  currentSelectedType: string = null;

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public actionSubject: ActionsSubject,
    public store: Store<any>,
    public menuHelperService: MenuHelperService,
    public http: HttpClient,
    public fb: FormBuilder,
    private subscriptionSettingsV2Service: SubscriptionSettingsV2Service,
    private documentsService: DocumentsService,
    private snackBarService: SnackBarService
  ) {
    super(
      titleService,
      router,
      route,
      i18nextPipe,
      sharedModule,
      actionSubject,
      store,
      menuHelperService,
      http,
      fb,
      documentsService
    );
  }

  model25Model: Array<{
    name?: string;
    value?: any;
    icon?: string;
    isSeparator?: boolean;
  }> = [];

  ngOnInit() {
    super.ngOnInit();
    this.setupModel25();
    this.model25Model.push({
      name: this.i18nextPipe.transform(
        this.modulePath + ':action.identify_finance_repartition'
      ),
      value: 'subscription-settings',
      icon: 'account_balance',
      isSeparator: false,
    });
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
      },
      {
        id: 'entity__taxpayer',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity__taxpayer`
        ),
      },
      {
        id: 'document_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.document_date`
        ),
        template: this.documentDateTemplate,
      },
      {
        id: 'total_amount',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.total_amount`
        ),
      },
      {
        id: 'paid',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.paid`),
        template: this.paidTemplate,
      },
      {
        id: 'buttons',
        title: '',
        sortable: false,
        isColumnStickyEnd: true,
        template: this.sharedModule.isSmallScreen()
          ? this.buttonsTemplate
          : undefined,
        hoverTemplate: this.sharedModule.isSmallScreen()
          ? undefined
          : this.buttonsTemplate,
        stopRowClickPropagation: true,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'paid',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.paid`),
        template: this.paidTemplate,
      },
    ];
  }

  model25ModelClick(event) {
    switch (event) {
      case 'subscription-settings':
        this.router.navigate(['subscription-settings']);
        break;
      case '1st-declaration':
        this.currentSelectedType = '1';
        this.model25WarningModal.open();
        break;
      case 'subs-declaration':
        this.currentSelectedType = '2';
        this.model25WarningModal.open();
        break;
      default:
        break;
    }
  }

  buildOptionsMenuDynamicly(data: Document) {
    const menu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    if (!data.block_remove) {
      menu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
    return menu;
  }

  setupModel25() {
    this.model25Model = [
      {
        name: this.i18nextPipe.transform(
          this.modulePath + ':action.identify_finance_repartition'
        ),
        value: 'subscription-settings',
        icon: 'account_balance',
        isSeparator: false,
      },
    ];
    this.subs.push(
      this.subscriptionSettingsV2Service
        .getOne()
        .subscribe((r: SubscriptionSetting) => {
          if (r.finance_department) {
            this.model25Model = [
              {
                name: this.i18nextPipe.transform(
                  this.modulePath + ':action.model_25_1st_decl'
                ),
                value: '1st-declaration',
                icon: 'account_balance',
                isSeparator: false,
              },
              {
                name: this.i18nextPipe.transform(
                  this.modulePath + ':action.model_25_subs_decl'
                ),
                value: 'subs-declaration',
                icon: 'account_balance',
                isSeparator: false,
              },
            ];
          }
        })
    );
  }

  getDeclaration(type: string) {
    this.model25WarningModal.close();
    const payload = this.buildModel25Payload(type);
    this.subs.push(
      this.documentsService.getModel25Declaration(payload).subscribe(
        (r: any) => {
          this.openModel25XML(r.body, r.type);
        },
        (err) => {
          const error = JSON.parse(err.headers.get('X-Flash-Messages'));
          error.error.forEach((error) => {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(error.message),
              this.sharedModule.WARN_COLOR,
              7000
            );
          });
        }
      )
    );
  }

  openModel25XML(file, type) {
    const fileR = new Blob([file], {
      type: this.fileTypesBlob[type],
    });
    const fileURL = window.URL.createObjectURL(fileR);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'model_25.xml';
    link.click();
  }

  buildModel25Payload(type: string): string {
    let i = 0;
    const fields = [
      'paid',
      'serie_number',
      'name',
      'entity_description',
      'taxpayer',
      'document_date',
    ];
    let obj: any = { type: type };

    fields.forEach((field: string) => {
      const tmpObj = {};
      switch (field) {
        case 'paid':
          if (this.filters[field]) {
            tmpObj[`filters_values[${i}][field]`] = field;
            tmpObj[`filters_values[${i}][operator]`] = 'eq';
            tmpObj[`filters_values[${i}][value]`] =
              this.filters.paid === 'true' ? 1 : 0;
            tmpObj[`filters_values[${i}][dynamic_search]`] = true;
            tmpObj[`filters_values[${i}][alias]`] = field;
            tmpObj[`filters_values[${i}][type]`] = 'string';
            tmpObj[`filters_values[${i}][entity]`] = '';
            i++;
          }
          break;
        case 'serie_number':
          if (this.filters[field]) {
            tmpObj[`filters_values[${i}][field]`] = field;
            tmpObj[`filters_values[${i}][operator]`] = 'contains';
            tmpObj[`filters_values[${i}][value]`] = this.filters.serie_number;
            tmpObj[`filters_values[${i}][dynamic_search]`] = true;
            tmpObj[`filters_values[${i}][alias]`] = field;
            tmpObj[`filters_values[${i}][type]`] = 'string';
            tmpObj[`filters_values[${i}][entity]`] = '';
            i++;
          }
          break;
        case 'name':
          if (this.filters[field]) {
            tmpObj[`filters_values[${i}][field]`] = field;
            tmpObj[`filters_values[${i}][operator]`] = 'contains';
            tmpObj[`filters_values[${i}][value]`] = this.filters.name;
            tmpObj[`filters_values[${i}][dynamic_search]`] = true;
            tmpObj[`filters_values[${i}][alias]`] = field;
            tmpObj[`filters_values[${i}][type]`] = 'string';
            tmpObj[`filters_values[${i}][entity]`] = '';
            i++;
          }
          break;
        case 'entity_description':
          if (this.filters[field]) {
            tmpObj[`filters_values[${i}][field]`] = field;
            tmpObj[`filters_values[${i}][operator]`] = 'contains';
            tmpObj[`filters_values[${i}][value]`] =
              this.filters.entity_description;
            tmpObj[`filters_values[${i}][dynamic_search]`] = true;
            tmpObj[`filters_values[${i}][alias]`] = field;
            tmpObj[`filters_values[${i}][type]`] = 'string';
            tmpObj[`filters_values[${i}][entity]`] = '';
            i++;
          }
          break;
        case 'taxpayer':
          if (this.filters[field]) {
            tmpObj[`filters_values[${i}][field]`] = field;
            tmpObj[`filters_values[${i}][operator]`] = 'contains';
            tmpObj[`filters_values[${i}][value]`] = this.filters.taxpayer;
            tmpObj[`filters_values[${i}][dynamic_search]`] = true;
            tmpObj[`filters_values[${i}][alias]`] = 'entity__taxpayer';
            tmpObj[`filters_values[${i}][type]`] = 'string';
            tmpObj[`filters_values[${i}][entity]`] = 'Entity';
            i++;
          }
          break;
        case 'document_date':
          if (
            this.filters['document_date_start'] ||
            this.filters['document_date_end']
          ) {
            tmpObj[`filters_values[${i}][field]`] = field;
            tmpObj[`filters_values[${i}][operator]`] = '..';
            tmpObj[`filters_values[${i}][from]`] = moment(
              this.filters.document_date_start
            ).format('YYYY-MM-DD');
            tmpObj[`filters_values[${i}][to]`] = moment(
              this.filters.document_date_end
            ).format('YYYY-MM-DD');
            tmpObj[`filters_values[${i}][dynamic_search]`] = true;
            tmpObj[`filters_values[${i}][alias]`] = field;
            tmpObj[`filters_values[${i}][type]`] = 'date';
            tmpObj[`filters_values[${i}][entity]`] = '';
            i++;
          }
          break;
      }
      obj = { ...obj, ...tmpObj };
    });

    let res = '';
    Object.keys(obj).forEach((key) => {
      res = res + encodeURI(`${key}=${obj[key]}`) + '&';
    });
    res = res.slice(0, -1);
    return res;
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.DocumentsActionTypes.SuccessPost,
          actions.DocumentsActionTypes.SuccessPut,
          actions.DocumentsActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
