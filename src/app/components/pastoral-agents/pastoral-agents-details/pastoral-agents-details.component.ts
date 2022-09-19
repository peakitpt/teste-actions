import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/pastoral-agents.actions';
import {
  getPastoralAgent,
  getPastoralAgentTypes,
} from '../reducers/pastoral-agents.selectors';
import { Observable } from 'rxjs';

import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { PastoralAgentsService } from '@peakitpt/ui-kyrios-api';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { EntityPastoralAgent } from '../../mecs/mecs.model';
import {
  PastoralAgentType,
  PastoralAgentTypesResponse,
} from '../pastoral-agents.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-pastoral-agents-details',
  templateUrl: './pastoral-agents-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PastoralAgentsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<EntityPastoralAgent>;
  model: any;
  returnUrl = 'pastoral-agents';
  modulePath = 'pastoral-agents';
  viewName = 'PastoralAgents';

  pastoralAgentTypes$: Observable<PastoralAgentTypesResponse>;
  pastoralAgentTypes: PastoralAgentType[];
  detailsTabs: any[] = [];
  pastoralAgentLinesColumns: any[] = [];
  pastoralAgentFormationsColumns: any[] = [];
  selectorGetModel = getPastoralAgent;
  actionRequestFail = actions.PastoralAgentsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  @ViewChild('personalDataTemplate') personalDataTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('loadingTemplate') loadingTemplate: TemplateRef<any>;
  @ViewChild('dacTemplate') dacTemplate: TemplateRef<any>;
  @ViewChild('dapjTemplate') dapjTemplate: TemplateRef<any>;
  @ViewChild('ecaTemplate') ecaTemplate: TemplateRef<any>;
  @ViewChild('emrcTemplate') emrcTemplate: TemplateRef<any>;
  @ViewChild('ecTemplate') ecTemplate: TemplateRef<any>;
  @ViewChild('puTemplate') puTemplate: TemplateRef<any>;
  @ViewChild('ddbpTemplate') ddbpTemplate: TemplateRef<any>;

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
    private pastoralAgentService: PastoralAgentsService
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

  ngOnInit() {
    super.ngOnInit();
    this.pastoralAgentTypes$ = this.store.select(getPastoralAgentTypes);
    this.store.dispatch(new actions.RequestGetTypes(null));
    this.subs.push(
      this.pastoralAgentTypes$.subscribe(
        (pastoralAgentTypes: PastoralAgentTypesResponse) => {
          if (pastoralAgentTypes) {
            this.pastoralAgentTypes = pastoralAgentTypes.results;
          }
        }
      )
    );
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.subs.push(
      this.model$.subscribe((model) => {
        this.model = model;
        this.setDetailTabs();
        if (model && this.detailsTabs.length < 8) {
          if (model.pu_type_id || model.pu_comments) {
            this.detailsTabs.push({
              textLabel: this.i18nextPipe.transform(
                this.modulePath + ':tabs.pu'
              ),
              templateContent: this.puTemplate,
            });
          }
          if (model.ddbp_comments) {
            this.detailsTabs.push({
              textLabel: this.i18nextPipe.transform(
                this.modulePath + ':tabs.ddbp'
              ),
              templateContent: this.ddbpTemplate,
            });
          }
        }
      })
    );
  }

  setDetailTabs() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.personal-data'
        ),
        templateContent: this.personalDataTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.categories'
        ),
        templateContent: this.categoriesTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.dac'),
        templateContent: this.dacTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.dapj'),
        templateContent: this.dapjTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.eca'),
        templateContent: this.ecaTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.emrc'),
        templateContent: this.emrcTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.ec'),
        templateContent: this.ecTemplate,
      },
    ];
  }
  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform(
          this.modulePath + ':action.generate_card'
        ),
        value: 'generate_card',
        icon: 'credit_card',
      },
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

  menuClick(event: any, data: any) {
    switch (event) {
      case 'generate_card':
        if (this.id) {
          this.pastoralAgentService.generateCard(
            this.id,
            +localStorage.getItem('subscriptionId'),
            localStorage.getItem('token')
          );
        }
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  getAgentTypeDescription(typeId: number): string {
    if (this.pastoralAgentTypes && typeId) {
      return this.pastoralAgentTypes.find(
        (x: PastoralAgentType) => x.id === typeId
      ).description;
    }
    return '';
  }

  anyPastoralAgentTypesFormations(type: string): boolean {
    return (
      this.model.pastoral_agents_formations &&
      this.model.pastoral_agents_formations.filter((x) => x.agent_type === type)
        .length
    );
  }
}
