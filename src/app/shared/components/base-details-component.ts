import { OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, Selector, ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { Subscription, Observable } from 'rxjs';
import { DialogComponent, SnackBarService, Tab } from '@peakitpt/ui-material';
import {
  ReportResponse,
  Report,
  SubscriptionReport,
  SubscriptionReportGroup,
} from 'src/app/components/reports/report.model';
import {
  getFormReports,
  getFormSubscriptionReports,
} from 'src/app/components/reports/reducers/reports.selectors';
import {
  RequestGetFormReports,
  RequestGetFormSubscriptionReports,
} from 'src/app/components/reports/reducers/reports.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared.module';
import { ofType } from '@ngrx/effects';

export class BaseDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<any>;
  model: any;
  returnUrl: string;
  modulePath: string;
  id: number;
  headerOptionsMenu: Array<{
    name?: string;
    value?: string;
    icon?: string;
    isSeparator?: boolean;
  }> = [];
  subs: Subscription[] = [];
  detailsTabs: Tab[] = [];
  treasuryDocOptionsMenu: Array<{
    icon?: string;
    name?: string;
    value: string;
  }> = [];
  openGenerateDocModal: boolean = false;

  // Reports
  viewName: string;
  reports$: Observable<ReportResponse>;
  subscriptionReports$: Observable<ReportResponse>;
  reportMenuOptionsModel: Array<{
    name?: string;
    value?: any;
    icon?: string;
    isSeparator?: boolean;
  }> = [];
  carboneReportsList = [];
  railsReportsList = [];

  fileIcons = {
    pdf: 'picture_as_pdf',
    docx: 'file_copy',
    xlsx: 'grid_on',
    odt: 'text_snippet',
    ods: 'grid_on',
  };
  fileTypesBlob = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    odt: 'application/vnd.oasis.opendocument.text',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
  };
  // Reports END

  // Selectors & actions
  selectorGetModel: Selector<any, any>;
  actionRequestFail: any;
  actionRequestGetOne: any;
  actionClearGet: any;
  actionRequestGetAll: any;
  // Selectors & actions END

  @ViewChild('modal') modal: DialogComponent;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.sharedModule.logAccess(this.subs, this.modulePath, this.route);
    if (this.actionClearGet) {
      this.store.dispatch(new this.actionClearGet());
    }
    this.buildHeaderOptionsMenu();

    this.subs.push(
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.id = +params.id;
          this.model$ = this.store.select(this.selectorGetModel);
          this.subs.push(
            this.model$.subscribe((model: any) => {
              if (model) {
                this.model = model;
                this.afterGetModel();
              }
            })
          );
          this.store.dispatch(new this.actionRequestGetOne(+params.id));
        }
      })
    );

    // Manage Reports
    this.reportMenuOptionsModel = [];
    this.getReports();
    this.getSubscriptionReports();
  }

  afterGetModel() {
    this.addTreasuryDocsOptions();
  }

  ngAfterViewInit() {
    this.subscribeForErrors();
    this.modal.open();
  }

  subscribeForErrors() {
    // Subscribe for details API errors
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail))
        .subscribe((result: any) => {
          if (result) {
            let errorMessage = '';

            if (result.payload.error.status === 400) {
              errorMessage = result.payload.error.error.message;
            } else if (result.payload.error.status === 401) {
              if ('message' in result.payload.error) {
                errorMessage = result.payload.error.error.message;
              } else {
                errorMessage = this.i18nextPipe.transform(
                  'translation:message.error_401',
                  { appName: environment.appName }
                );
              }
            } else if (
              result.payload.error.status === 422 &&
              'error' in result.payload.error
            ) {
              for (const key of Object.keys(result.payload.error.error)) {
                errorMessage += `${result.payload.error.error[key]}\n`;
              }
            }

            this.snackBarService.openSnackBar(
              errorMessage,
              this.sharedModule.ERROR_COLOR
            );
            this.modal.close();
          }
        })
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
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
  }

  modalClose() {
    this.navigate(this.returnUrl);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  editModal() {
    this.returnUrl = `/${this.modulePath}/${this.id}/edit`;
    this.matDialog.closeAll();
  }

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }

  menuClick(event: any, data: any) {
    switch (event) {
      case 'delete':
        this.router.navigate([this.modulePath, data.id, 'details', 'delete']);
        break;
      case 'duplicate':
        this.returnUrl = `/${this.modulePath}/${data.id}/duplicate`;
        this.matDialog.closeAll();
        break;
      case 'view_doc':
        if (data.document_id) {
          window.open(
            `${environment.railsAppUrl}/documents/${data.document_id}`,
            '_blank'
          );
        }
        break;
      case 'download_doc':
        if (data.document_id) {
          window.open(
            `${environment.railsAppUrl}/documents/${data.document_id}/printpdf?format=pdf&file=documento`,
            '_blank'
          );
        }
        break;
      case 'generate_doc':
        this.openGenerateDocModal = true;
        break;
      default:
        break;
    }
  }

  getReports(viewNameReplacer?: string) {
    // Get Carbone Reports list
    if (this.viewName || viewNameReplacer) {
      const filter = {
        module: viewNameReplacer ? viewNameReplacer : this.viewName,
        report_type: 'Form',
      };
      const carboneReports$ = this.store.select(getFormReports);
      this.store.dispatch(
        new RequestGetFormReports({
          query: filter,
          page: 0,
          limit: 'all',
        })
      );

      this.subs.push(
        carboneReports$.subscribe((result: any) => {
          this.carboneReportsList = [];
          if (result) {
            if (result.results.length) {
              const parent = {
                name: this.i18nextPipe.transform(
                  `reports:message.created_reports`
                ),
                icon: 'edit_note',
                children: [],
              };

              result.results.forEach((rep: Report) => {
                parent.children.push({
                  name: rep.name,
                  value: {
                    fileName: rep.report_file,
                    fileType: rep.export_type,
                    reportType: rep.report_type,
                  },
                  icon: this.fileIcons[rep.export_type],
                });
              });
              this.carboneReportsList.push(parent);
            }
          }
        })
      );
    }
  }

  reportMenuClick(file: any) {
    if (file.isRailsReport !== true) {
      this.subs.push(
        this.model$.subscribe((response: any) => {
          const url = `${environment.reportsUrl}?filePath=${file.fileName}&convertTo=${file.fileType}`;

          this.subs.push(
            this.http
              .post(url, response, { responseType: 'blob' })
              .subscribe((r) => {
                this.openFileNewTab(r, file.fileType);
              })
          );
        })
      );
    } else {
      this.openDetailsReport(file);
    }
  }

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/${this.modulePath.toLowerCase()}/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }

  openFileNewTab(file, type) {
    const fileR = new Blob([file], {
      type: this.fileTypesBlob[type],
    });
    const fileURL = window.URL.createObjectURL(fileR);
    window.open(fileURL);
  }

  getSubscriptionReports(viewNameReplacer?: string) {
    // Get Rails Reports list
    if (this.viewName || viewNameReplacer) {
      const params = {
        view: viewNameReplacer ? viewNameReplacer : this.viewName,
        index_report: false,
      };

      const railsReports$ = this.store.select(getFormSubscriptionReports);
      this.store.dispatch(new RequestGetFormSubscriptionReports(params));

      this.subs.push(
        railsReports$.subscribe((result: any) => {
          this.railsReportsList = [];
          if (result) {
            if (result.length === 1) {
              result[0].reports.forEach((rep: SubscriptionReport) => {
                this.railsReportsList.push({
                  name: rep.report_name,
                  icon: 'picture_as_pdf',
                  fileName: rep.report_name,
                  fileType: 'pdf',
                  isRailsReport: true,
                  filePath: rep.report_path,
                });
              });
            } else {
              result.forEach((grouper: SubscriptionReportGroup) => {
                const parent = {
                  name: grouper.grouper,
                  icon: 'description',
                  children: [],
                };
                grouper.reports.forEach((rep: SubscriptionReport) => {
                  parent.children.push({
                    name: rep.report_name,
                    value: {
                      fileName: rep.report_name,
                      fileType: 'pdf',
                      isRailsReport: true,
                      filePath: rep.report_path,
                    },
                    icon: 'picture_as_pdf',
                  });
                });
                this.railsReportsList.push(parent);
              });
            }
            this.joinReports();
          }
        })
      );
    }
  }

  joinReports() {
    // Clear the list
    this.reportMenuOptionsModel = [];

    // Push the Carbone Reports
    this.reportMenuOptionsModel.push(...this.carboneReportsList);

    if (this.carboneReportsList.length && this.railsReportsList.length) {
      this.reportMenuOptionsModel.push({ isSeparator: true });
    }

    // Push the Rails Reports
    this.reportMenuOptionsModel.push(...this.railsReportsList);
  }

  addTreasuryDocsOptions() {
    if (this.model.document_id) {
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
    } else if (
      this.model.emolument_description &&
      this.model.tax &&
      this.model.document_entity_description
    ) {
      this.treasuryDocOptionsMenu = [
        {
          icon: 'note_add',
          name: this.i18nextPipe.transform(
            'documents:action.treasury_doc.generate_doc'
          ),
          value: 'generate_doc',
        },
      ];
    }
  }

  closeGenerateDocModal(docGeneratedSuccesfully: boolean) {
    this.openGenerateDocModal = false;
    if (docGeneratedSuccesfully) {
      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform('documents:message.generate_doc_success'),
        this.sharedModule.SUCCESS_COLOR
      );

      this.store.dispatch(new this.actionRequestGetAll()); // Refresh table
      this.modal.close();
      this.router.navigate([this.modulePath, this.model.id, 'details']);
    }
  }
}
