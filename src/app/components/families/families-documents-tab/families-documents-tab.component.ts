import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';
import { DocumentResponse } from 'src/app/components/documents/document.model';
import { getDocumentsList } from 'src/app/components/documents/reducers/documents.selectors';
import { RequestFamily } from 'src/app/components/documents/reducers/documents.actions';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FamiliesV1Service } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-families-documents-tab',
  templateUrl: './families-documents-tab.component.html',
})
export class FamiliesDocumentsTabComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() modulePath: string;

  appName = 'archive';
  modelList$: Observable<DocumentResponse>;
  limit = 5;
  familyId: number;

  selectorGetList = getDocumentsList;
  actionRequestGetAll = RequestFamily;

  @ViewChild('documentsDateTemplate') documentsDateTemplate: TemplateRef<any>;
  @ViewChild('documentsTotalTemplate') documentsTotalTemplate: TemplateRef<any>;
  @ViewChild('documentsPaidTemplate') documentsPaidTemplate: TemplateRef<any>;

  // SEARCH
  booleanOptions: Array<{ label: string; value: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: '',
    },
    {
      label: this.i18nextPipe.transform('translation:yes'),
      value: 'true',
    },
    {
      label: this.i18nextPipe.transform('translation:no'),
      value: 'false',
    },
  ];

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
    public moduleService?: FamiliesV1Service
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
      moduleService
    );
  }

  ngOnInit() {
    this.subs.push(
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.familyId = +params.id;
        }
      })
    );
    super.ngOnInit();
  }

  buildHeaderOptionsMenu() {}

  refreshTable() {
    if (this.familyId) {
      this.store.dispatch(
        new this.actionRequestGetAll({
          query: this.filters,
          page: this.page,
          limit: this.limit,
          sort: this.sort,
          order: this.order,
          familyId: this.familyId,
        })
      );
    }
  }

  manageReports() {}

  buildSearchForm() {
    this.searchForm = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            'documents:model.entity_description'
          ),
          value: null,
          mainField: true,
        }),
        document_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform('translation:range.min'),
          value: null,
        }),
        document_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform('translation:range.max'),
          value: null,
        }),
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            'documents:model.serie_number'
          ),
          value: null,
        }),
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform('documents:model.name'),
          value: null,
        }),
        paid: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform('documents:model.paid'),
          value: '',
        }),
        has_parochial_rights: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            'documents:placeholder.has_parochial_rights'
          ),
          value: '',
        }),
      }),
    });
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'document_date',
        title: this.i18nextPipe.transform('documents:model.document_date'),
        template: this.documentsDateTemplate,
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform('documents:model.entity_description'),
      },
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform('documents:model.serie_number'),
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform('documents:model.name'),
      },
      {
        id: 'total_amount',
        title: this.i18nextPipe.transform('documents:model.total_amount'),
        template: this.documentsTotalTemplate,
      },
      {
        id: 'paid',
        title: this.i18nextPipe.transform('documents:model.paid'),
        template: this.documentsPaidTemplate,
      },
    ];

    this.smallScreenTableColumns = [
      this.tableColumns[0],
      this.tableColumns[5],
      this.tableColumns[4],
      this.tableColumns[3],
    ];
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'document_date_start':
      case 'document_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }
}
