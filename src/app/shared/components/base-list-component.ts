import { Title } from '@angular/platform-browser';
import { Store, ActionsSubject, Selector } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { Subscription, Observable } from 'rxjs';
import {
  ViewChild,
  TemplateRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TableComponent } from '@peakitpt/ui-material';

import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModelListData } from 'src/app/shared/shared.model';
import { MenuHelperService } from 'src/app/components/base/services/menu-helper.service';
import {
  SearchLine,
  SideMenuInterface,
} from 'src/app/components/base/base.component';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';
import {
  Report,
  ReportResponse,
  SubscriptionReport,
  SubscriptionReportGroup,
} from 'src/app/components/reports/report.model';
import {
  getListReports,
  getListSubscriptionReports,
} from 'src/app/components/reports/reducers/reports.selectors';
import {
  RequestGetListReports,
  RequestGetListSubscriptionReports,
} from 'src/app/components/reports/reducers/reports.actions';
import { ofType } from '@ngrx/effects';

export class BaseListComponent implements OnInit, AfterViewInit, OnDestroy {
  appName: string;
  modulePath: string;
  searchFormTemplate: string;
  searchFormStructure: SearchLine[] = [];
  subs: Subscription[] = [];
  modelList$: Observable<any>;
  modelListData: ModelListData;
  modelEntirely$: Observable<any>;
  tableColumns: any[] = [];
  smallScreenTableColumns: any[] = [];
  selectedRows$: Observable<any[]>;
  filters: any = {};
  page: number;
  limit: number;
  sort: string;
  order: string;
  pagerMenu: any[] = [];
  headerOptionsMenu: any[] = [];
  toolbarDataModel: any[] = [];
  sideNavMainButton: boolean;

  // Reports
  viewName: string;
  reportUrl: string;
  reportFile: any;
  reportMenuOptionsModel: Array<{
    name?: string;
    value?: any;
    icon?: string;
    isSeparator?: boolean;
  }> = [];
  carboneReportsList = [];
  railsReportsList = [];

  // SEARCH fields
  searchForm: FormGroup;

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
  selectorGetList: Selector<any, any>;
  selectorGetSelected: Selector<any, any[]>;
  selectorGetListEntirely: Selector<any, any>;
  actionSetSelected: any;
  actionRequestGetAll: any;
  actionClearGetAll: any;
  actionRequestGetListEntirely: any;
  // Selectors & actions END

  @ViewChild('table') table: TableComponent;
  @ViewChild('buttonsTemplate') buttonsTemplate: TemplateRef<any>;

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
    public moduleService?: any
  ) {}

  ngOnInit() {
    this.sharedModule.logAccess(this.subs, this.modulePath, this.route);
    this.pagerMenu = this.sharedModule.getPagerMenu();

    this.titleService.setTitle(
      `${environment.appName} | ${this.i18nextPipe.transform(
        this.modulePath + ':module.name_many'
      )}`
    );

    this.buildHeaderOptionsMenu();

    this.modelList$ = this.store.select(this.selectorGetList);
    this.subs.push(
      this.modelList$.subscribe((response: ModelListData) => {
        this.modelListData = response;
      })
    );

    this.refreshTable();
    this.manageReports();
    this.buildSearchForm();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchFormTemplate = this.modulePath;
      this.setSideNav();
      this.ngOnResize();

      // This refreshes the table everytime something is added or deleted
      this.subs.push(this.tableChangesDetector());
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    if (this.actionClearGetAll) {
      this.store.dispatch(new this.actionClearGetAll());
    }
  }

  @HostListener('window:resize', ['$event'])
  ngOnResize() {
    this.buildTableColumns();
    if (this.sharedModule.isSmallScreen()) {
      this.tableColumns = this.smallScreenTableColumns;
    }
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

  paginationChangeEvent(event: {
    previousPageIndex: number;
    pageIndex: number;
    pageSize: number;
    length: number;
  }) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.refreshTable();
  }

  checkboxSelectionEvent(event: any[]) {
    this.store.dispatch(new this.actionSetSelected(event));
    this.selectedRows$ = this.store.select(this.selectorGetSelected);
  }

  columnFilterEvent(event: any) {
    this.page = 1;
    const filters = { ...this.filters };
    filters[event.column] = event.filter ? event.filter : null;
    this.filters = filters;
    this.refreshTable();
  }

  columnOrdinationEvent(event: { active: string; direction: string }) {
    this.page = 1;
    this.sort = event.active;
    this.order = event.direction;
    this.refreshTable();
  }

  refreshTable() {
    this.store.dispatch(
      new this.actionRequestGetAll({
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
      })
    );
  }

  manageReports() {
    this.reportMenuOptionsModel = [];
    this.getReports();
    this.getSubscriptionReports();
    this.subscribeToModelEntirely(); // This susbscription prints the reports with ALL the data
  }

  setSideNav() {
    this.subs.push(
      this.menuHelperService
        .createSideMenuInterface(
          this.appName,
          this.modulePath,
          this.searchFunction,
          this.searchFormStructure,
          this.searchFormTemplate,
          this.sideNavMainButton
        )
        .subscribe((r: SideMenuInterface) => {
          if (r) {
            this.store.dispatch(new RequestPostSideNav(r));
          }
        })
    );
  }

  tableChangesDetector(): Subscription {
    return new Subscription();
  }

  buildTableColumns() {}

  navigate(route: string) {
    this.router.navigate([route]);
  }

  menuClick(event: string, data?: any) {
    switch (event) {
      case 'delete':
        this.store.dispatch(new this.actionSetSelected([data]));
        this.router.navigate([this.modulePath, data.id, 'delete']);
        break;
      case 'duplicate':
        this.router.navigate([this.modulePath, data.id, 'duplicate']);
        break;
      default:
        break;
    }

    this.setLimit(event);
  }

  setLimit(event: any) {
    if (event.includes('limit_')) {
      const limit = event.split('_').pop();

      if (limit === 'all') {
        this.limit = this.modelListData.total;
      } else if (!isNaN(+limit) && +limit > 0) {
        this.limit = limit;
      }
      this.refreshTable();
    }
  }

  toolbarItemClick(event: any) {
    event.click();
  }

  deleteMulti() {
    this.router.navigate([this.modulePath, 'delete']);
  }

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }

  // REPORTS START
  reportMenuClick(file: any) {
    if (file.isRailsReport !== true) {
      this.reportUrl = `${environment.reportsUrl}?filePath=${file.fileName}&convertTo=${file.fileType}`;
      this.reportFile = file;

      if (file.reportType === 'DetailsList' || file.reportType === 'List') {
        if (this.page == undefined) {
          this.page = 1;
        }

        const params = {
          query: this.filters,
          page: this.page,
          limit: this.limit,
          sort: this.sort,
          order: this.order,

          params: {
            reportURL: this.reportUrl,
            filename: file.fileName,
            type: file.fileType,
          },
        };

        if (this.moduleService) {
          const detailedReportSub: Subscription = this.moduleService
            .getDetailedReport(params)
            .subscribe(
              (r) => {
                this.openFileNewTab(r, r.type);
                detailedReportSub.unsubscribe();
              },
              (error) => {
                detailedReportSub.unsubscribe();
              }
            );
        }
      } else {
        // Dispatching this will trigger the subscription at:
        // subscribeToModelEntirely
        this.store.dispatch(
          new this.actionRequestGetListEntirely({
            query: this.filters,
            page: this.page,
            limit: this.limit,
            sort: this.sort,
            order: this.order,
          })
        );
      }
    } else {
      this.openRailsReport(file);
    }
  }

  openRailsReport(file: any) {
    const url = `${
      environment.railsAppUrl
    }/${this.reportModulePath()}/report/printpdf?format=pdf&file=${
      file.filePath
    }`;
    window.open(url);
  }

  reportModulePath(): string {
    return this.modulePath.toLowerCase().split('-').join('_');
  }

  subscribeToModelEntirely() {
    if (this.selectorGetListEntirely) {
      this.modelEntirely$ = this.store.select(this.selectorGetListEntirely);
      this.subs.push(
        this.modelEntirely$.subscribe((response: ModelListData) => {
          if (response) {
            this.subs.push(
              this.http
                .post(this.reportUrl, response.results, {
                  responseType: 'blob',
                })
                .subscribe((r) => {
                  this.openFileNewTab(r, this.reportFile.fileType);
                })
            );
          }
        })
      );
    }
  }

  openFileNewTab(file, type) {
    const fileR = new Blob([file], {
      type: this.fileTypesBlob[type],
    });
    const fileURL = window.URL.createObjectURL(fileR);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'kyrios_report.' + this.reportFile.fileType;
    link.click();
  }

  getReports(viewNameReplacer?: string) {
    // Get Reports list
    if (this.viewName || viewNameReplacer) {
      const filter = {
        module: viewNameReplacer ? viewNameReplacer : this.viewName,
        report_type: 'List',
      };
      const carboneReports$ = this.store.select(getListReports);
      this.store.dispatch(
        new RequestGetListReports({
          query: filter,
          page: 0,
          limit: 'all',
        })
      );

      this.subs.push(
        carboneReports$.subscribe((result: ReportResponse) => {
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
            this.joinReports();
          }
        })
      );
    }
  }

  getSubscriptionReports(viewNameReplacer?: string) {
    // Get Subscription Reports list
    if (this.viewName || viewNameReplacer) {
      const params = {
        view: viewNameReplacer ? viewNameReplacer : this.viewName,
        index_report: true,
      };

      const railsReports$ = this.store.select(getListSubscriptionReports);
      this.store.dispatch(new RequestGetListSubscriptionReports(params));

      this.subs.push(
        railsReports$.subscribe((result: SubscriptionReportGroup[]) => {
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
    this.reportMenuOptionsModel = [];
    this.reportMenuOptionsModel = this.carboneReportsList.concat(
      this.railsReportsList
    );
  }
  // REPORTS END

  // SEARCH START
  searchFunction = (data: any) => {
    this.filters = data;
    this.page = 1;
    this.refreshTable();
  };

  buildSearchForm() {
    this.searchForm = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({}),
    });
  }

  searchWordSearch() {
    this.updateSearchFields(this.searchForm.value.searchWord);
    this.search();
  }

  updateSearchFields(searchWord: string = '') {
    const fieldsObject = {};

    if (searchWord) {
      // Removes last trailing whitespace
      if (searchWord.slice(-1) === ' ') {
        searchWord = searchWord.slice(0, -1);
      }

      // Divides on braquet close + whitespace
      const fieldsArray = searchWord.split(') ');
      for (const item of fieldsArray) {
        const itemArray = item.split(':(', 2);
        if (itemArray[1] && itemArray[1].slice(-1) === ')') {
          // Removes last close braquet in case its forgoten
          itemArray[1] = itemArray[1].slice(0, -1);
        }
        if (itemArray[1]) {
          // Add to object only if it has a value
          fieldsObject[itemArray[0]] = itemArray[1];
        }
      }
    }

    const formSearchFields = this.searchForm.value.searchFields;
    // Manage main field search when there is no ':('
    if (!searchWord?.includes(':(')) {
      this.searchForm.get('searchWord').setValue(searchWord);
      Object.keys(formSearchFields).forEach((field) => {
        if (formSearchFields[field].mainField === true) {
          this.updateField(field, searchWord);
        } else {
          this.updateField(field, null);
        }
      });
    } else {
      // If the key matches the label, add it to the search fields

      Object.keys(formSearchFields).forEach((field: string) => {
        if (fieldsObject[formSearchFields[field].searchWordLabel]) {
          this.updateField(
            field,
            fieldsObject[formSearchFields[field].searchWordLabel]
          );
        } else {
          this.updateField(field, null);
        }
      });
    }
  }

  updateField(field: string, newValue: any) {
    this.searchForm
      .get('searchFields')
      .get(field)
      .get('value')
      .setValue(newValue);
  }

  search() {
    const newFilter = {};

    Object.keys(this.searchForm.value.searchFields).forEach((field: string) => {
      newFilter[field] = this.searchForm.value.searchFields[field].value;
    });
    this.filters = newFilter;
    this.refreshTable();
  }

  searchFieldSearch() {
    this.updateSearchWords(this.searchForm.value.searchFields);
    this.search();
  }

  updateSearchWords(data: any) {
    let searchString = '';

    Object.keys(data).forEach((key: string) => {
      if (![null, undefined, '', 'null'].includes(data[key].value)) {
        searchString += this.searchStringBuilder(
          data[key].searchWordLabel,
          data[key].value,
          key
        );
      }

      this.searchForm.get('searchWord').setValue(searchString);
    });
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    return `${searchWordLabel}:(${value}) `;
  }

  clearSearch() {
    this.buildSearchForm();
    this.search();
  }
  // SEARCH END
}
