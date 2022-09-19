import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TableComponent } from '@peakitpt/ui-material';

import {
  getReadersList,
  getReadersListEntirely,
  getSelectedReaders,
} from '../reducers/readers.selectors';
import * as actions from '../reducers/readers.actions';
import { EntityReader } from '../../mecs/mecs.model';
import { ReaderResponse } from '../readers.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ReadersService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-readers-list',
  templateUrl: './readers-list.component.html',
})
export class ReadersListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'readers';
  modelList$: Observable<ReaderResponse>;
  selectedRows$: Observable<EntityReader[]>;
  selectorGetList = getReadersList;
  selectorGetSelected = getSelectedReaders;
  selectorGetListEntirely = getReadersListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirelyReaders;
  @ViewChild('table') table: TableComponent;
  @ViewChild('serieNumberTemplate') serieNumberTemplate: TemplateRef<any>;
  @ViewChild('readerNumberTemplate') readerNumberTemplate: TemplateRef<any>;
  @ViewChild('entityNameTemplate') entityNameTemplate: TemplateRef<any>;
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
    public moduleService?: ReadersService
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
    super.ngOnInit();
    this.searchFormStructure = [];
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'entity.entity_person.serie_number',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entity.entity_person.serie_number'
        ),
        filter: false,
        template: this.serieNumberTemplate,
      },
      {
        id: 'entity.name',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entity.name'
        ),
        filter: false,
        template: this.entityNameTemplate,
      },
      {
        id: 'reader_number',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.reader_number'
        ),
        filter: false,
        template: this.readerNumberTemplate,
      },
      {
        id: 'buttons',
        title: '',
        filter: false,
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
    this.smallScreenTableColumns = [this.tableColumns[0], this.tableColumns[1]];
  }

  menuClick(event: any, data?: EntityReader) {
    switch (event) {
      case 'delete': {
        this.store.dispatch(new actions.SetSelected([data]));
        this.navigate(`/readers/${data.id}/delete`);
        break;
      }
      case 'duplicate': {
        this.navigate(`/readers/${data.id}/duplicate`);
        break;
      }
      default: {
        super.menuClick(event, data);
        break;
      }
    }

    this.setLimit(event);
  }
}
