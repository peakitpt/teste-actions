import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getBishopric,
  getSelectedBishoprics,
} from '../reducers/bishoprics.selectors';
import * as actions from '../reducers/bishoprics.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Bishopric } from '../bishopric.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';
import { SharedModule } from 'src/app/shared/shared.module';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-bishoprics-delete',
  templateUrl: './bishoprics-delete.component.html',
})
export class BishopricsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modeList$: Observable<Bishopric[]>;
  modeList: Bishopric[];
  returnUrl = ['/bishoprics'];
  modulePath = 'bishoprics';

  selectorGetModel = getBishopric;
  selectorGetSelected = getSelectedBishoprics;
  actionRequestFail = actions.BishopricsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.BishopricsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;

  canDelete = false;
  currentSubscription = +localStorage.getItem('subscriptionId');
  canEdit = {
    isSuperUser: false,
    isSubscriptionAdmin: false,
  };

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public sharedModule: SharedModule,
    private baseStore: Store<BaseState.State>,
    private subscriptionService: SubscriptionsService
  ) {
    super(
      store,
      router,
      route,
      matDialog,
      i18nextPipe,
      snackBarService,
      actionSubject,
      sharedModule
    );
  }

  ngOnInit() {
    this.isLoading = true;

    this.subs.push(
      // Get the parent URL so we can return to it after closing the modal and access the Item ID
      this.route.parent.paramMap.subscribe((parentParams: any) => {
        if (Object.keys(parentParams.params).includes('id')) {
          // Set the returnUrl from parent URL
          this.constructReturlUrl(parentParams);

          // Get the Item to delete
          this.store.dispatch(
            new this.actionRequestGetOne(+parentParams.params.id)
          );
          this.subs.push(
            this.store.select(this.selectorGetModel).subscribe((obj: any) => {
              if (obj) {
                this.modelList = [obj];
                this.isLoading = false;
                this.setCanEdit(obj);
              }
            })
          );
        } else {
          // Get the list's selected objects to delete
          this.modelList$ = this.store.select(this.selectorGetSelected);
          this.subs.push(
            this.modelList$.subscribe((modelList: any[]) => {
              this.modelList = modelList;
              if (modelList && modelList.length) {
                this.isLoading = false;
              }
            })
          );
        }
      })
    );
  }

  setCanEdit(obj: any) {
    this.subs.push(
      this.baseStore
        .select(BaseSelectors.getUserInfo)
        .subscribe(async (r: any) => {
          if (r) {
            const isSuperUser = this.sharedModule.checkIfEntityType(
              SharedModule.USER_SUPERUSERS,
              r.payload.user.entity
            );
            this.canEdit.isSuperUser = isSuperUser;
            const isSubscriptionAdmin =
              await this.subscriptionService.isSubscriptionAdmin();
            this.canEdit.isSubscriptionAdmin = isSubscriptionAdmin;
            this.canDelete = this.canEditBishopric(
              obj.entity_relation_attributes
            );
          }
        })
    );
  }

  canEditBishopric(bishopricData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      bishopricData &&
      [bishopricData.entity_id].includes(this.currentSubscription)
    );
  }
}
