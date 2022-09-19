import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getWorshipplace,
  getSelectedWorshipplaces,
} from '../reducers/worshipplaces.selectors';
import * as actions from '../reducers/worshipplaces.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Worshipplace } from '../worshipplace.model';
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
  selector: 'kyr-worshipplaces-delete',
  templateUrl: './worshipplaces-delete.component.html',
})
export class WorshipplacesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modeList$: Observable<Worshipplace[]>;
  modeList: Worshipplace[];
  returnUrl = ['/worshipplaces'];
  modulePath = 'worshipplaces';

  selectorGetModel = getWorshipplace;
  selectorGetSelected = getSelectedWorshipplaces;
  actionRequestFail = actions.WorshipplacesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.WorshipplacesActionTypes.SuccessDelete;
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
            this.canDelete = this.canEditWorshipplace(
              obj.entity_relation_attributes
            );
          }
        })
    );
  }

  canEditWorshipplace(worshipplaceData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      worshipplaceData &&
      [
        worshipplaceData.entity_id,
        worshipplaceData.diocese_id,
        worshipplaceData.archpriestship_id,
        worshipplaceData.paroquia_id,
      ].includes(this.currentSubscription)
    );
  }
}
