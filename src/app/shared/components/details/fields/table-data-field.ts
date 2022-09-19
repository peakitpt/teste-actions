import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VisibleField } from './visible-field';

export class TableDataField extends VisibleField {
  type: string = 'tabledata';
  modelList$: Observable<any>;
  limit: number = 5;
  page: number;
  hasFooter: boolean = false;

  selectorGetList: Selector<any, any>;
  actionRequestGetAll: any;

  tableColumns: any[] = [];
  filters: any = {};
  sort: string;
  order: string;
  store: Store<any>;
  id: any;
  

  refreshTable() {
    this.store.dispatch(
      new this.actionRequestGetAll({
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
        id: this.id,
      })
    );
  };

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

  public constructor(init?:Partial<TableDataField>) {
    super();
    Object.assign(this, init);
    this.modelList$ = this.store.select(this.selectorGetList)
    this.refreshTable();
  }
}