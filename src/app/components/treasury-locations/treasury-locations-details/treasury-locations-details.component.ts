import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/treasury-locations.actions';
import { getTreasuryLocation } from '../reducers/treasury-locations.selectors';
import { Observable } from 'rxjs';
import { TreasuryLocation } from '../treasury-location.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { Tab } from 'src/app/shared/components/details/fields/tab-field';
import { Section } from 'src/app/shared/components/details/fields/section-field';
import { TextField } from 'src/app/shared/components/details/fields/text-field';
import { IconField } from 'src/app/shared/components/details/fields/icon-field';

@Component({
  selector: 'kyr-treasury-locations-details',
  templateUrl: './treasury-locations-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TreasuryLocationsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<TreasuryLocation>;
  returnUrl = '/treasury-locations';
  modulePath = 'treasury-locations';
  viewName = 'TreasuryLocation';

  selectorGetModel = getTreasuryLocation;
  actionRequestFail =
    actions.TreasuryLocationsActionTypes.RequestFailTreasuryLocations;
  actionRequestGetOne = actions.RequestGetTreasuryLocation;

  detailsFields: Tab[] = [];

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
    private baseStore: Store<BaseState.State>,
    private subscriptionService: SubscriptionsService
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
    this.buildFields();
  }

  buildFields() {
    this.detailsFields = [
      new Tab({
        name: 'treasury_location',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':header.treasury_location'
        ),
        fields: [
          new Section({
            id: 'treasury_location',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.treasury_location`
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.name`
                ),
                model: this.model.name,
                isVisible: this.model.name,
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.active`
                ),
                model: this.model.active,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
            ],
          }),
        ],
      }),
    ];
  }
}
