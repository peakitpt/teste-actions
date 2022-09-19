import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/countries.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/countries.actions';
import * as modalActions from '../../../shared/components/modals/countries-modal/reducers/countries-modal.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getCountry } from '../reducers/countries.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Country } from '../country.model';
import { SharedModule } from 'src/app/shared/shared.module';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-countries-form',
  templateUrl: './countries-form.component.html',
})
export class CountriesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Country>;
  modulePath = 'countries';

  selectorGetModel = getCountry;
  actionRequestFail = actions.CountriesActionTypes.RequestFailCountries;
  actionRequestGetAll = actions.RequestGetAllCountries;
  actionRequestGetOne = actions.RequestGetCountry;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionRequestPut = actions.RequestPutCountry;
  actionSuccessPut = actions.CountriesActionTypes.SuccessPutCountry;
  actionRequestPost = actions.RequestPostCountry;
  actionSuccessPost = actions.CountriesActionTypes.SuccessPostCountry;

  currentSubscription = +localStorage.getItem('subscriptionId');
  canEdit = {
    isSuperUser: false,
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
    private baseStore: Store<BaseState.State>,
    private subscriptionService: SubscriptionsService
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
      id: [],
      name: [null, Validators.required],
      cca2: [],
      cca3: [],
      cioc: [],
      name_official: [],
      validated: [],
    });
  }

  ngOnInit() {
    this.setCanEdit();
    super.ngOnInit();
  }

  addToHeaderOptionsMenu() {
    if (this.canDeleteCountry()) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
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
            if (!this.canEditCountry()) {
              this.modal.close();
            }
          }
        })
    );
  }

  canEditCountry(): boolean {
    // KYR-3884: If the user has access, it can automatically edit countries

    // if (this.canEdit.isSuperUser) {
    //   return true;
    // }
    // return false;
    return true;
  }

  canDeleteCountry(): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return false;
  }
}
