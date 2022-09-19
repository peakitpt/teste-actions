import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';

import { Newsletter } from 'src/app/components/newsletters/newsletter.model';
import { getNewsletter } from 'src/app/components/newsletters/reducers/newsletters.selectors';
import * as actions from 'src/app/components/newsletters/reducers/newsletters.actions';

import { State as GroupsState } from 'src/app/components/groups/reducers/groups.reducer';
import { Group, GroupResponse } from 'src/app/components/groups/group.model';
import { getGroupsListEntirely } from 'src/app/components/groups/reducers/groups.selectors';
import { RequestGetEntirely as GroupsGetEntirely } from 'src/app/components/groups/reducers/groups.actions';

import { State as NewslettersLayoutsState } from 'src/app/components/newsletters-layouts/reducers/newsletters-layouts.reducer';
import {
  NewslettersLayout,
  NewslettersLayoutResponse,
} from 'src/app/components/newsletters-layouts/newsletters-layout.model';
import { getNewslettersLayoutsListEntirely } from 'src/app/components/newsletters-layouts/reducers/newsletters-layouts.selectors';
import { RequestGetEntirely as NewslettersLayoutGetEntirely } from 'src/app/components/newsletters-layouts/reducers/newsletters-layouts.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-newsletters-form',
  templateUrl: './newsletters-form.component.html',
  styleUrls: ['./newsletters-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewslettersFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  environment = environment;
  model$: Observable<Newsletter>;
  modulePath = 'newsletters';

  // Selectors & actions
  selectorGetModel = getNewsletter;
  actionRequestFail = actions.NewslettersActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.NewslettersActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.NewslettersActionTypes.SuccessPost;
  // Selectors & actions END

  /* This specific's component fields */
  selectedNewsletter: Newsletter;
  openSendNewsletterModal = false;
  frequencyOptions: Array<{ value: number; label: string }> = [];
  groupsOptions: Array<{ value: number; label: string }> = [
    {
      value: null,
      label: '----',
    },
  ];
  layoutsOptions: Array<{ value: number; label: string; layout: string }> = [
    {
      value: null,
      label: '----',
      layout: null,
    },
  ];

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private groupsStore: Store<GroupsState>,
    private layoutsStore: Store<NewslettersLayoutsState>
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      fb,
      i18nextPipe,
      snackBarService,
      actionSubject
    );
  }

  initializeForm() {
    this.form = this.fb.group({
      active: [false],
      additional_recipients: [],
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      entity_ekklesia_location_id: [],
      for_internal_read: [false],
      frequency: [1, Validators.required],
      from: [],
      id: [],
      layout: [],
      message: [null, Validators.required],
      sending_date: [new Date(), Validators.required],
      sending_hour: [
        this.sharedModule.parseDateToString(new Date(), 'HH:mm'),
        [
          Validators.required,
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      sent_at: [],
      subject: [null, Validators.required],
      sync_at: [],
      test_recipient: [],
      title: [null, Validators.required],
      to: [],
      updated_at: [],
      updated_by_user_id: [],
    });

    this.detectLayoutChanges();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFrequencyOptions();
    this.getGroups();
    this.getLayouts();
  }

  addToHeaderOptionsMenu() {
    this.headerOptionsMenu.push(
      {
        name: this.i18nextPipe.transform(`${this.modulePath}:action.send_test`),
        value: 'send_test',
        icon: 'send',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      }
    );
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'send_test':
        if (this.model) {
          this.selectedNewsletter = this.model;
          this.openSendNewsletterModal = true;
        }
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setFrequencyOptions() {
    this.frequencyOptions = [
      {
        value: 1,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:frequency.unique`
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(`${this.modulePath}:frequency.daily`),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:frequency.weekly`
        ),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:frequency.monthly`
        ),
      },
      {
        value: 5,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:frequency.yearly`
        ),
      },
    ];
  }

  private getGroups() {
    const groups$: Observable<GroupResponse> = this.groupsStore.select(
      getGroupsListEntirely
    );
    this.groupsStore.dispatch(new GroupsGetEntirely({ limit: 'none' }));
    this.subs.push(
      groups$.subscribe((result: GroupResponse) => {
        if (result) {
          result.results.forEach((group: Group) => {
            this.groupsOptions.push({
              label: group.name,
              value: group.id,
            });
          });
        }
      })
    );
  }

  private getLayouts() {
    const layouts$: Observable<NewslettersLayoutResponse> = this.layoutsStore.select(
      getNewslettersLayoutsListEntirely
    );
    this.layoutsStore.dispatch(
      new NewslettersLayoutGetEntirely({ limit: 'none' })
    );
    this.subs.push(
      layouts$.subscribe((result: NewslettersLayoutResponse) => {
        if (result) {
          result.results.forEach((layout: NewslettersLayout) => {
            this.layoutsOptions.push({
              label: layout.title,
              value: layout.id,
              layout: layout.layout,
            });
          });
        }
      })
    );
  }

  detectLayoutChanges() {
    this.form.controls['layout'].valueChanges.subscribe((layout_id: number) => {
      if (layout_id) {
        const option = this.layoutsOptions.find((o) => o.value === layout_id);
        if (option) {
          this.affectField('layout', null);
          this.affectField('message', option.layout);
        }
      }
    });
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
