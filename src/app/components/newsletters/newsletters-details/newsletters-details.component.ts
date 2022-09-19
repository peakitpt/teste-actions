import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SnackBarService } from '@peakitpt/ui-material';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';

import { Newsletter } from '../newsletter.model';
import * as actions from '../reducers/newsletters.actions';
import { getNewsletter } from '../reducers/newsletters.selectors';

import { State as GroupsState } from 'src/app/components/groups/reducers/groups.reducer';
import {
  RequestGet as RequestGetGroup,
  ClearGet as ClearGetGroup,
} from 'src/app/components/groups/reducers/groups.actions';
import { getGroup } from 'src/app/components/groups/reducers/groups.selectors';
import { Group } from 'src/app/components/groups/group.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'kyr-newsletters-details',
  templateUrl: './newsletters-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NewslettersDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Newsletter>;
  model: Newsletter;
  returnUrl = '/newsletters';
  modulePath = 'newsletters';
  viewName = 'Newsletter';

  // Selectors & actions
  selectorGetModel = getNewsletter;
  actionRequestFail = actions.NewslettersActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;
  // Selectors & actions END

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('readStatusTabTemplate') readStatusTabTemplate: TemplateRef<any>;

  /* This specific's component fields */
  selectedNewsletter: Newsletter;
  openSendNewsletterModal = false;
  groupName: string = '';
  frequencyOptions: Array<{ label: string; value: number }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      value: 1,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.unique`),
    },
    {
      value: 2,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.daily`),
    },
    {
      value: 3,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.weekly`),
    },
    {
      value: 4,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.monthly`),
    },
    {
      value: 5,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.yearly`),
    },
  ];

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
    public sanitizer: DomSanitizer,
    private groupsStore: Store<GroupsState>
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

  afterGetModel() {
    super.afterGetModel();
    this.getGroup();

    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform(`${this.modulePath}:action.send_test`),
        value: 'send_test',
        icon: 'send',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
    ];

    if (this.model.id && this.model.for_internal_read) {
      this.detailsTabs = [
        {
          textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.main`),
          templateContent: this.mainTabTemplate,
        },
        {
          textLabel: this.i18nextPipe.transform(
            `${this.modulePath}:tabs.read_status`
          ),
          templateContent: this.readStatusTabTemplate,
        },
      ];
    }
  }

  menuClick(event: any, data: Newsletter) {
    switch (event) {
      case 'send_test':
        this.selectedNewsletter = data;
        this.openSendNewsletterModal = true;
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  get_frequency_name(frequency_id: number): string {
    return (
      this.frequencyOptions.find((o) => o.value == frequency_id).label || ''
    );
  }

  private getGroup() {
    const group$: Observable<Group> = this.groupsStore.select(getGroup);
    this.groupsStore.dispatch(new RequestGetGroup(+this.model.to));
    this.subs.push(
      group$.subscribe((result: Group) => {
        if (result) {
          this.groupsStore.dispatch(new ClearGetGroup());
          this.groupName = result.name;
        }
      })
    );
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
