import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/users.actions';
import { getUser } from '../reducers/users.selectors';
import { Observable } from 'rxjs';
import { User, entityTypes } from '../user.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { EntitySubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ModelListData, SelectedModalRow } from 'src/app/shared/shared.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import * as subscriptionActions from '../../subscriptions/reducers/subscriptions.actions';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

@Component({
  selector: 'kyr-users-details',
  templateUrl: './users-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UsersDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<User>;
  returnUrl = '/users';
  modulePath = 'users';
  entityTypes = entityTypes;
  viewName = 'User';

  selectorGetModel = getUser;
  actionRequestFail = actions.UsersActionTypes.RequestFailUsers;
  actionRequestGetOne = actions.RequestGetUser;

  modelList: ModelListData;
  subscriptionColumns = [];
  page: number;
  limit: number;
  sort: string;
  order: string;
  pagerMenu: any[] = [];
  @ViewChild('entityType2CompleteRelationTemplate')
  entityType2CompleteRelationTemplate: TemplateRef<any>;
  @ViewChild('entityType2NameTemplate')
  entityType2NameTemplate: TemplateRef<any>;

  isSaving = false;
  form: FormGroup;
  parishionersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

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
    private entitySubscriptionsService: EntitySubscriptionsService,
    private fb: FormBuilder,
    private parishionersStore: Store<ParishionersState.State>
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
    this.sharedModule.logAccess(this.subs, this.modulePath, this.route);
    if (this.actionClearGet) {
      this.store.dispatch(new this.actionClearGet());
    }
    this.buildHeaderOptionsMenu();

    this.subs.push(
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.id = +params.id;
          this.model$ = this.store.select(this.selectorGetModel);
          this.store.dispatch(new this.actionRequestGetOne(+params.id));
          this.subs.push(
            this.model$.subscribe((r) => {
              if (r) {
                this.model = r;
                this.getUserSubscriptions(this.id);
                this.initializeForm();
                this.subscribeForSavingActions();
                this.setParishionersModal();
              }
            })
          );
        }
      })
    );

    // Manage Reports
    this.reportMenuOptionsModel = [];
    this.getReports();
    this.getSubscriptionReports();
  }

  ngAfterViewInit() {
    this.buildUserSubscriptionsColumns();
    this.pagerMenu = this.sharedModule.getPagerMenu();
    super.ngAfterViewInit();
  }

  // SUBSCRIPTIONS --
  getUserSubscriptions(userId: number = this.id) {
    const payload = {
      query: {
        entity1_id: userId,
      },
      page: this.page,
      limit: this.limit,
      sort: this.sort,
      order: this.order,
    };
    this.subs.push(
      this.entitySubscriptionsService.getAll(payload).subscribe((r) => {
        this.modelList = r;
      })
    );
  }

  columnOrdinationEvent(event: { active: string; direction: string }) {
    this.page = 1;
    this.sort = event.active;
    this.order = event.direction;
    this.getUserSubscriptions();
  }

  paginationChangeEvent(event: {
    previousPageIndex: number;
    pageIndex: number;
    pageSize: number;
    length: number;
  }) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getUserSubscriptions();
  }

  buildUserSubscriptionsColumns() {
    this.subscriptionColumns = [
      {
        id: 'entity2_subscription',
        title: this.i18nextPipe.transform(
          `subscriptions:model.entity2.complete_relation`
        ),
        template: this.entityType2CompleteRelationTemplate,
      },
      {
        id: 'entity2_name',
        title: this.i18nextPipe.transform(
          `subscriptions:model.entity2.entity_type.name`
        ),
        template: this.entityType2NameTemplate,
      },
    ];
  }

  setLimit(event: any) {
    if (event.includes('limit_')) {
      const limit = +event.split('_').pop();
      if (limit && limit > 0) {
        this.limit = limit;
      }
      this.getUserSubscriptions();
    }
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
      entity1_description: [this.model.name, Validators.required],
      entity1_id: [this.model.entity_id, Validators.required],
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

  parishionerMenuClick(event: string, inputName?: string) {
    switch (event) {
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
      default: {
        break;
      }
    }
  }

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {},
    modalTitle = ''
  ) {
    this.router.navigate([modalName], {
      queryParams: {
        modalTitle,
        inputName,
        modalParams: btoa(JSON.stringify(modalParams)),
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = [
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: `clear_parishioner_modal`,
        icon: 'clear',
      },
      {
        name: this.i18nextPipe.transform('translation:action.view'),
        value: `view_selected_parishioner`,
        icon: 'preview',
      },
    ];

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

  onSubmit() {
    this.isSaving = true;

    if (this.form.valid) {
      this.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  savingError(message: string) {
    this.isSaving = false;
    this.snackBarService.openSnackBar(message, this.sharedModule.ERROR_COLOR);
  }

  onFormValid(payload = this.form.getRawValue()) {
    console.log('onFormValid');
    this.parishionersStore.dispatch(
      new subscriptionActions.RequestPost(payload)
    );
  }

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(
          ofType(
            subscriptionActions.SubscriptionsActionTypes
              .RequestFailSubscriptions,
            subscriptionActions.SubscriptionsActionTypes.SuccessPost
          )
        )
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result?.payload instanceof RequestError) {
            this.snackBarService.openSnackBar(
              result?.payload.error.error,
              this.sharedModule.ERROR_COLOR,
              5000
            );
          } else {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.save_success`
              ),
              this.sharedModule.SUCCESS_COLOR
            );
            this.getUserSubscriptions();
            this.initializeForm();
          }
        })
    );
  }
}
