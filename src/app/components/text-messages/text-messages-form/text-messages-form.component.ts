import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SnackBarService } from '@peakitpt/ui-material';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { Store, ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { State as GroupsState } from 'src/app/shared/components/modals/groups-modal/reducers/groups-modal.reducer';
import { getGroupsSelected } from 'src/app/shared/components/modals/groups-modal/reducers/groups-modal.selectors';

import { TextMessage } from '../text-message.model';
import { State } from '../reducers/text-messages.reducer';
import { getTextMessage } from '../reducers/text-messages.selectors';
import * as actions from '../reducers/text-messages.actions';

@Component({
  selector: 'kyr-text-messages-form',
  templateUrl: './text-messages-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TextMessagesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<TextMessage>;
  model: TextMessage;
  modulePath = 'text-messages';

  selectorGetModel = getTextMessage;
  actionRequestFail = actions.TextMessagesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.TextMessagesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.TextMessagesActionTypes.SuccessPost;

  /* This specific's component fields */
  groupsMenuOptions: ModalMenuOption[] = [];
  frequencyOptions: Array<{ value: number; label: string }> = [];
  minDate: Date = new Date();
  selectedTextMessage: TextMessage;
  openSendTextMessageModal = false;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private groupsStore: Store<GroupsState>
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
      created_at: [],
      description: [null, Validators.required],
      frequency: [null, Validators.required],
      group_description: [],
      group_id: [],
      id: [],
      message: [null, Validators.required],
      sending_date: [new Date(), Validators.required],
      sending_hour: [
        this.sharedModule.parseDateToString(new Date(), 'HH:mm'),
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      sent_at: [],
      test_recipient: [],
      updated_at: [],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setGroupsModal();
    this.setFrequencyOptions();
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

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.minDate = new Date(obj.sending_date);
  }

  onFormValid() {
    if (
      this.form.value.group_id ||
      this.form.value.additional_recipients ||
      this.form.value.test_recipient
    ) {
      super.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_no_recipient`
        )
      );
    }
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'send_test':
        if (this.model) {
          this.selectedTextMessage = this.model;
          this.openSendTextMessageModal = true;
        }
        break;
      case 'clear_group_modal':
        if (inputName) {
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      case 'view_selected_group':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('groups', id);
          }
        }
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setGroupsModal() {
    this.groupsMenuOptions = this.defaultModalMenu('group');

    this.subs.push(
      this.groupsStore
        .select(getGroupsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.name);
          }
        })
    );
  }

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
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
