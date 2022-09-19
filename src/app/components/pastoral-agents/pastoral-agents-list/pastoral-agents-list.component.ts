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
  getPastoralAgentsList,
  getPastoralAgentsListEntirely,
  getSelectedPastoralAgents,
} from '../reducers/pastoral-agents.selectors';
import * as actions from '../reducers/pastoral-agents.actions';
import { EntityPastoralAgent } from '../../mecs/mecs.model';
import { PastoralAgentResponse } from '../pastoral-agents.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { PastoralAgentsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-pastoral-agents-list',
  templateUrl: './pastoral-agents-list.component.html',
})
export class PastoralAgentsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'pastoral-agents';
  modelList$: Observable<PastoralAgentResponse>;
  selectedRows$: Observable<EntityPastoralAgent[]>;
  selectorGetList = getPastoralAgentsList;
  selectorGetSelected = getSelectedPastoralAgents;
  selectorGetListEntirely = getPastoralAgentsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirelyPastoralAgents;
  @ViewChild('table') table: TableComponent;
  @ViewChild('serieNumberTemplate') serieNumberTemplate: TemplateRef<any>;
  @ViewChild('pastoralAgentNumberTemplate')
  pastoralAgentNumberTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('approvedTemplate') approvedTemplate: TemplateRef<any>;
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
    public moduleService?: PastoralAgentsService
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
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entity.entity_person.serie_number'
        ),
        filter: false,
        template: this.serieNumberTemplate,
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entity.name'
        ),
        filter: false,
        template: this.entityNameTemplate,
      },
      {
        id: 'pastoral_agent_number',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.pastoral_agent_number'
        ),
        filter: false,
        template: this.pastoralAgentNumberTemplate,
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(this.modulePath + ':model.active'),
        filter: false,
        template: this.activeTemplate,
      },
      {
        id: 'approved',
        title: this.i18nextPipe.transform(this.modulePath + ':model.approved'),
        filter: false,
        template: this.approvedTemplate,
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

  menuClick(event: any, data?: EntityPastoralAgent) {
    switch (event) {
      case 'delete': {
        this.store.dispatch(new actions.SetSelected([data]));
        this.navigate(`pastoral-agents/${data.id}/delete`);
        break;
      }
      case 'duplicate': {
        this.navigate(`pastoral-agents/${data.id}/duplicate`);
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
