import { OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {
  DialogComponent,
  SnackBarService,
  TableDataSource,
} from '@peakitpt/ui-material';
import { Store, Selector } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SelectedModalRow } from '../../shared.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

export interface ListResponse {
  results: any[];
  total: number;
  page: number;
  limit: number;
}

export class BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath: string;
  subs: Subscription[] = [];
  modelList$: Observable<any>;
  dataSource: TableDataSource<any> = new TableDataSource([]);
  tableColumns: any[] = [];
  isLoading = true;
  filters: any = {};
  modalTitle: string;
  modalParams: any = {};
  queryStringParams: any = {};
  inputName: string;
  form: FormGroup;

  page = 1;
  limit = 20;
  sort = '';
  order = '';
  total = 0;

  selectorGetList: Selector<any, any>;
  actionRequestGetAll: any;
  selectorGetError: Selector<any, any>;
  actionRequestFail: any;
  actionClearGetAll: any;
  actionRequestSetSelected: any;

  @ViewChild('modal') modal: DialogComponent;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public fb: FormBuilder,
    public snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.modalTitle = this.route.snapshot.queryParamMap.get('modalTitle');
    this.inputName = this.route.snapshot.queryParamMap.get('inputName');
    // Getting Params:
    this.modalParams = JSON.parse(
      atob(this.route.snapshot.queryParamMap.get('modalParams'))
    );

    // Getting Query String Params:
    if (this.route.snapshot.queryParamMap.get('queryStringParams')) {
      const tmpQueryStringParams = JSON.parse(
        atob(this.route.snapshot.queryParamMap.get('queryStringParams'))
      );
      if (tmpQueryStringParams !== null && tmpQueryStringParams !== undefined) {
        this.queryStringParams = tmpQueryStringParams;
      }
    }

    this.modalParamsToFilters();
    this.modelList$ = this.store.select(this.selectorGetList);
    this.subscriceToErrors();
    this.buildForm();
    this.refreshTable();
  }

  refreshTable() {
    this.isLoading = true;
    const payload = {
      query: this.filters,
      page: this.page,
      limit: this.limit,
      sort: this.sort,
      order: this.order,
    };

    if (
      this.queryStringParams &&
      Object.keys(this.queryStringParams).length > 0
    ) {
      payload['params'] = this.queryStringParams;
    }

    this.store.dispatch(new this.actionRequestGetAll(payload));
  }

  ngAfterViewInit() {
    this.tableColumns = this.setTableColumns();
    this.modal.open();
    this.subs.push(
      this.modal.modalClosed.subscribe(() => this.redirectToParentPage())
    );
    this.subs.push(
      this.modelList$.subscribe((response: ListResponse) => {
        this.total = response.total;
        this.dataSource.data = response.results;
        this.isLoading = false;
      })
    );
  }

  redirectToParentPage() {
    const url = this.router.url.split('/');
    url.pop();
    this.router.navigate(url, {
      queryParams: {
        isQuickInsertion:
          this.route.snapshot.queryParamMap.get('isQuickInsertion'),
        inputNameQI: this.route.snapshot.queryParamMap.get('inputNameQI'),
        modalParamsQI: this.route.snapshot.queryParamMap.get('modalParamsQI'),
      },
    });
  }

  setTableColumns(): any[] {
    return [];
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    if (this.actionClearGetAll) {
      this.store.dispatch(new this.actionClearGetAll());
    }
  }

  return(model: any) {
    this.store.dispatch(
      new this.actionRequestSetSelected({
        inputName: this.inputName,
        model,
      } as SelectedModalRow)
    );
    this.modal.close();
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

  columnOrdinationEvent(event: { active: string; direction: string }) {
    this.page = 1;
    this.sort = event.active;
    this.order = event.direction;
    this.refreshTable();
  }

  subscriceToErrors() {
    if (this.actionRequestFail && this.selectorGetError) {
      this.subs.push(
        this.store.select(this.selectorGetError).subscribe((r) => {
          if (r) {
            this.isLoading = false;
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(`translation:message.error_401`, {
                appName: environment.appName,
              }),
              '#FFB204'
            );
          }
        })
      );
    }
  }

  // Search Related Functions
  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({}),
    });
  }

  search() {
    const newFilter = {};

    Object.keys(this.form.value.searchFields).forEach((field: string) => {
      newFilter[field] = this.form.value.searchFields[field].value;
    });

    this.filters = newFilter;
    this.modalParamsToFilters();
    this.refreshTable();
  }

  public modalParamsToFilters() {
    const myFilters = { ...this.filters };
    Object.keys(this.modalParams).forEach((param: string) => {
      myFilters[param] = this.modalParams[param];
    });
    this.filters = myFilters;
  }

  searchFieldSearch() {
    this.updateSearchWords();
    this.search();
  }

  searchWordSearch() {
    this.updateSearchFields(this.form.value.searchWord);
    this.search();
  }

  updateSearchWords() {
    const data = this.form.value.searchFields;
    let searchString = '';

    Object.keys(data).forEach((key) => {
      if (![null, undefined, '', 'null'].includes(data[key].value)) {
        searchString =
          searchString +
          this.searchStringBuilder(
            data[key].searchWordLabel,
            data[key].value,
            key
          );
      }

      this.form.get('searchWord').setValue(searchString);
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

    const formSearchFields = this.form.value.searchFields;
    // Manage main field search when there is no ':('
    if (!searchWord.includes(':(')) {
      this.form.get('searchWord').setValue(searchWord);
      Object.keys(formSearchFields).forEach((field) => {
        if (formSearchFields[field].mainField === true) {
          this.form
            .get('searchFields')
            .get(field)
            .get('value')
            .setValue(searchWord);
        } else {
          this.form.get('searchFields').get(field).get('value').setValue(null);
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
          this.form.get('searchFields').get(field).get('value').setValue(null);
        }
      });
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    this.form.get('searchFields').get(field).get('value').setValue(newValue);
  }

  clearSearch() {
    this.buildForm();
    this.search();
  }

  // ---
}
