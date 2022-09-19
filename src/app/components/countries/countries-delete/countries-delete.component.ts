import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getCountry,
  getSelectedCountries,
} from '../reducers/countries.selectors';
import * as actions from '../reducers/countries.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Country } from '../country.model';
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
  selector: 'kyr-countries-delete',
  templateUrl: './countries-delete.component.html',
})
export class CountriesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<Country[]>;
  modelList: Country[] = [];
  returnUrl = ['/countries'];
  modulePath = 'countries';

  selectorGetModel = getCountry;
  selectorGetSelected = getSelectedCountries;
  actionRequestFail = actions.CountriesActionTypes.RequestFailCountries;
  actionRequestGetAll = actions.RequestGetAllCountries;
  actionRequestGetOne = actions.RequestGetCountry;
  actionRequestDelete = actions.RequestDeleteCountry;
  actionSuccessDelete = actions.CountriesActionTypes.SuccessDeleteCountry;
  actionSetSelected = actions.SetSelectedCountries;

  canDelete = false;
  canEdit = {
    isSuperUser: false,
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
              console.log('obj - ', obj);
              if (obj) {
                this.modelList = [obj];
                this.isLoading = false;
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
        this.setCanEdit();
      })
    );
  }

  setCanEdit() {
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
            this.canDelete = this.canEditCountry();
          }
        })
    );
  }

  canEditCountry(): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return false;
  }
}
