import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogComponent } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable } from 'rxjs';

import { SectionResponse, Section } from '../section.model';
import {
  RequestGetAllSections,
  SetModalSelectSection
} from '../reducers/sections.actions';
import { State } from '../reducers/sections.reducer';
import { getSectionsList } from '../reducers/sections.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-sections-list-modal',
  templateUrl: './sections-list-modal.component.html'
})
export class SectionsListModalComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private returnUrl: any[] = [];
  sections$: Observable<SectionResponse>;
  tableColumns: any[] = [];
  filters: any = {};
  page: number;
  limit: number;
  sort: string;
  order: string;
  inputName: string;

  @ViewChild('modal') modal: DialogComponent;
  @ViewChild('blockRemoveTemplate') blockRemoveTemplate: TemplateRef<any>;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private i18next: I18NextPipe
  ) {}

  ngOnInit() {
    this.returnUrl = window.location.pathname
      .split('/')
      .filter((path: string) => !['', 'sections-list-modal'].includes(path));

    this.inputName = this.route.snapshot.queryParamMap.get('inputName');

    this.sections$ = this.store.select(getSectionsList);
    this.refreshTable();
  }

  refreshTable() {
    this.store.dispatch(
      new RequestGetAllSections({
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order
      })
    );
  }

  ngAfterViewInit() {
    this.tableColumns = [
      {
        id: 'description',
        title: this.i18next.transform('sections:model.description')
      },
      {
        id: 'reference',
        title: this.i18next.transform('sections:model.reference')
      },
      {
        id: 'block_remove',
        title: this.i18next.transform('sections:model.block_remove'),
        template: this.blockRemoveTemplate
      }
    ];
    this.modal.open();
  }

  ngOnDestroy() {
    this.store.dispatch(new SetModalSelectSection(null));
  }

  emitRowClick(model: Section) {
    this.store.dispatch(
      new SetModalSelectSection({
        inputName: this.inputName,
        model
      } as SelectedModalRow)
    );
    this.modal.close();
  }

  paginationChangeEvent(event: any) {
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

  columnOrdinationEvent(event: any) {
    this.page = 1;
    this.sort = event.active;
    this.order = event.direction;
    this.refreshTable();
  }

  modalClose() {
    this.router.navigate(this.returnUrl);
  }
}
