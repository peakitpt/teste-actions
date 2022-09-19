import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { State } from '../reducers/subscriptions.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/subscriptions.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getSubscription } from '../reducers/subscriptions.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Subscription } from '../subscription.model';
import { SharedModule } from 'src/app/shared/shared.module';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import * as UsersState from '../../../shared/components/modals/users-modal/reducers/users-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import { getUsersSelected } from 'src/app/shared/components/modals/users-modal/reducers/users-modal.selectors';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { RequestGetSubscriptions } from '../../base/reducers/base.actions';

@Component({
  selector: 'kyr-subscriptions-form',
  templateUrl: './subscriptions-form.component.html',
})
export class SubscriptionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Subscription>;
  modulePath = 'subscriptions';

  subscriptionModalMenu = [
    {
      name: this.i18nextPipe.transform('translation:action.clear'),
      value: 'clear_modal',
      icon: 'clear',
    },
  ];

  selectorGetModel = getSubscription;
  actionRequestFail = actions.SubscriptionsActionTypes.RequestFailSubscriptions;
  actionRequestGetAll = actions.RequestGetAllSubscriptions;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.SubscriptionsActionTypes.SuccessPost;

  parishionersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  usersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  parishionersModalParams = {
    modal: true,
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users_with_demo: true,
    format: 'json',
    documents: true,
  };

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private parishionersStore: Store<ParishionersState.State>,
    private usersStore: Store<UsersState.State>
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
      block_remove: [false, Validators.required],
      can_create: [false, Validators.required],
      can_delete: [false, Validators.required],
      can_edit: [false, Validators.required],
      can_read: [false, Validators.required],
      created_at: [],
      created_by_user_id: [],
      deleted: [false, Validators.required],
      deleted_by_user_id: [],
      entity1_description: [null, Validators.required],
      entity1_id: [null, Validators.required],
      entity2_description: [null, Validators.required],
      entity2_id: [null, Validators.required],
      id: [],
      is_subscription_admin: [false, Validators.required],
      sync_at: [],
      updated_at: [],
      updated_by_user_id: [],
      view_id: [],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setParishionersModal();
    this.setUsersModal();
  }

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail, this.actionSuccessPost))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result?.payload instanceof RequestError) {
            this.snackBarService.openSnackBar(
              result?.payload.error.error,
              this.sharedModule.ERROR_COLOR,
              5000
            );
          } else {
            this.isLoading = true;

            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.save_success`
              ),
              this.sharedModule.SUCCESS_COLOR
            );

            if (
              this.form.value.entity1_id == localStorage.getItem('userEntityId')
            ) {
              const subscriptionPayload = {
                userId: localStorage.getItem('userId'),
                ekklesiaId: localStorage.getItem('subscriptionId'),
              };
              this.store.dispatch(
                new RequestGetSubscriptions(subscriptionPayload)
              );
            }

            this.modal.close();
          }
        })
    );
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'save_new': {
        this.onSubmit();
        this.router
          .navigate([this.modulePath])
          .then(() => this.router.navigate([this.modulePath, 'new']));
        break;
      }
      case 'delete': {
        if (this.id) {
          this.router.navigate([this.modulePath, this.id, 'edit', 'delete']);
        }
        break;
      }
      case 'clear_parishioner_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      }
      case 'view_selected_parishioner': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('subscriptions', id);
          }
        }
        break;
      }
      case 'clear_users_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      }
      case 'view_selected_users': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('subscriptions', id);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = this.defaultModalMenu('parishioner');

    // When a row is selected
    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.complete_relation);
          }
        })
    );
  }

  private setUsersModal() {
    this.usersMenuOptions = this.defaultModalMenu('user');

    // When a row is selected
    this.subs.push(
      this.usersStore
        .select(getUsersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.entity_id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.name);
          }
        })
    );
  }
}
