import { Action } from '@ngrx/store';
import * as actions from './accruals-processments.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccrualsProcessment,
  AccrualsProcessmentResponse,
} from '../accruals-processment.model';

export interface State {
  accrualsProcessments: AccrualsProcessmentResponse;
  accrualsProcessmentsEntirely: AccrualsProcessmentResponse;
  accrual: AccrualsProcessment;
  selectedIds: AccrualsProcessment[];
  error: RequestError;
}

export const initialState: State = {
  accrualsProcessments: null,
  accrualsProcessmentsEntirely: null,
  accrual: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accrualsProcessments: any;
  let accrualsProcessmentsEntirely: any;
  let accrual: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccrualsProcessmentsActionTypes
      .RequestFailAccrualsProcessments:
      const error = (action as actions.RequestFailAccrualsProcessments).payload;
      return { ...state, error };

    case actions.AccrualsProcessmentsActionTypes
      .RequestGetAllAccrualsProcessments:
      return { ...state, error: null };

    case actions.AccrualsProcessmentsActionTypes
      .SuccessGetAllAccrualsProcessments:
      accrualsProcessments = (action as actions.SuccessGetAllAccrualsProcessments)
        .payload;
      return { ...state, accrualsProcessments };

    case actions.AccrualsProcessmentsActionTypes.RequestPostProcessAccrual:
      return { ...state, error: null };

    case actions.AccrualsProcessmentsActionTypes.SuccessPostProcessAccrual:
      accrual = (action as actions.SuccessPostProcessAccrual).payload;
      return { ...state, accrual };

    case actions.AccrualsProcessmentsActionTypes
      .SetSelectedAccrualsProcessments:
      selectedIds = (action as actions.SetSelectedAccrualsProcessments).payload;
      return { ...state, selectedIds };

    case actions.AccrualsProcessmentsActionTypes
      .RequestGetEntirelyAccrualsProcessments:
      return { ...state, error: null };

    case actions.AccrualsProcessmentsActionTypes
      .SuccessGetEntirelyAccrualsProcessments:
      accrualsProcessmentsEntirely = (action as actions.SuccessGetEntirelyAccrualsProcessments)
        .payload;
      return { ...state, accrualsProcessmentsEntirely };

    default:
      return state;
  }
}
