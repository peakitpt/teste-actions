import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getNumerationsView,
  getSelectedNumerationsViews,
} from '../reducers/numerations-views.selectors';
import * as actions from '../reducers/numerations-views.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { NumerationsView } from '../numerations-view.model';

@Component({
  selector: 'kyr-numerations-views-delete',
  templateUrl: './numerations-views-delete.component.html',
})
export class NumerationsViewsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<NumerationsView[]>;
  modelList: NumerationsView[] = [];
  returnUrl = ['/numerations-views'];
  modulePath = 'numerations-views';

  selectorGetModel = getNumerationsView;
  selectorGetSelected = getSelectedNumerationsViews;
  actionRequestFail =
    actions.NumerationsViewsActionTypes.RequestFailNumerationsViews;
  actionRequestGetAll = actions.RequestGetAllNumerationsViews;
  actionRequestGetOne = actions.RequestGetNumerationsView;
  actionRequestDelete = actions.RequestDeleteNumerationsView;
  actionSuccessDelete =
    actions.NumerationsViewsActionTypes.SuccessDeleteNumerationsView;
  actionSetSelected = actions.SetSelectedNumerationsViews;
}
