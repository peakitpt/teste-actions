import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getTreasuryLocation,
  getSelectedTreasuryLocations,
} from '../reducers/treasury-locations.selectors';
import * as actions from '../reducers/treasury-locations.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { TreasuryLocation } from '../treasury-location.model';
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
  selector: 'kyr-treasury-locations-delete',
  templateUrl: './treasury-locations-delete.component.html',
})
export class TreasuryLocationsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<TreasuryLocation[]>;
  modelList: TreasuryLocation[] = [];
  returnUrl = ['/treasury-locations'];
  modulePath = 'treasury-locations';

  selectorGetModel = getTreasuryLocation;
  selectorGetSelected = getSelectedTreasuryLocations;
  actionRequestFail =
    actions.TreasuryLocationsActionTypes.RequestFailTreasuryLocations;
  actionRequestGetAll = actions.RequestGetAllTreasuryLocations;
  actionRequestGetOne = actions.RequestGetTreasuryLocation;
  actionRequestDelete = actions.RequestDeleteTreasuryLocation;
  actionSuccessDelete =
    actions.TreasuryLocationsActionTypes.SuccessDeleteTreasuryLocation;
  actionSetSelected = actions.SetSelectedTreasuryLocations;
}
