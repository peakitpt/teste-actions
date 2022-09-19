import { Action } from '@ngrx/store';
import * as actions from './dashboard.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

export interface State {
  entities: any;
  baptisms: any;
  baptismsCuria: any;
  weddings: any;
  weddingsCuria: any;
  accounting: any;
  pendingProcesses: any;
  curiaPendingProcesses: any;
  lastProcesses: any;
  alerts: any;
  priestsRequestChanges: any;
  error: RequestError;
}

export const initialState: State = {
  entities: null,
  baptisms: null,
  baptismsCuria: null,
  weddings: null,
  weddingsCuria: null,
  accounting: null,
  pendingProcesses: null,
  curiaPendingProcesses: null,
  lastProcesses: null,
  alerts: null,
  priestsRequestChanges: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let entities: any;
  let baptisms: any;
  let baptismsCuria: any;
  let weddings: any;
  let weddingsCuria: any;
  let accounting: any;
  let pendingProcesses: any;
  let curiaPendingProcesses: any;
  let lastProcesses: any;
  let priestsRequestChanges: any;
  let alerts: any;

  switch (action.type) {
    case actions.DashboardActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.DashboardActionTypes.RequestGetEntities:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetEntities:
      entities = (action as actions.SuccessGetEntities).payload;
      return { ...state, entities };

    case actions.DashboardActionTypes.RequestGetBaptisms:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetBaptisms:
      baptisms = (action as actions.SuccessGetBaptisms).payload;
      return { ...state, baptisms };

    case actions.DashboardActionTypes.RequestGetBaptismsCuria:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetBaptismsCuria:
      baptismsCuria = (action as actions.SuccessGetBaptismsCuria).payload;
      return { ...state, baptismsCuria };

    case actions.DashboardActionTypes.RequestGetWeddings:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetWeddings:
      weddings = (action as actions.SuccessGetWeddings).payload;
      return { ...state, weddings };

    case actions.DashboardActionTypes.RequestGetWeddingsCuria:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetWeddingsCuria:
      weddingsCuria = (action as actions.SuccessGetWeddingsCuria).payload;
      return { ...state, weddingsCuria };

    case actions.DashboardActionTypes.RequestGetAccounting:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetAccounting:
      accounting = (action as actions.SuccessGetAccounting).payload;
      return { ...state, accounting };

    case actions.DashboardActionTypes.RequestGetPendingProcesses:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetPendingProcesses:
      pendingProcesses = (action as actions.SuccessGetPendingProcesses).payload;
      return { ...state, pendingProcesses };

    case actions.DashboardActionTypes.RequestGetCuriaPendingProcesses:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetCuriaPendingProcesses:
      curiaPendingProcesses = (
        action as actions.SuccessGetCuriaPendingProcesses
      ).payload;
      return { ...state, curiaPendingProcesses };

    case actions.DashboardActionTypes.RequestGetLastProcesses:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetLastProcesses:
      lastProcesses = (action as actions.SuccessGetLastProcesses).payload;
      return { ...state, lastProcesses };

    case actions.DashboardActionTypes.RequestGetAlerts:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetAlerts:
      alerts = (action as actions.SuccessGetAlerts).payload;
      return { ...state, alerts };

    case actions.DashboardActionTypes.RequestGetPriestsChangesRequests:
      return { ...state, error: null };

    case actions.DashboardActionTypes.SuccessGetPriestsChangesRequests:
      priestsRequestChanges = (
        action as actions.SuccessGetPriestsChangesRequests
      ).payload;
      return { ...state, priestsRequestChanges };

    default:
      return state;
  }
}
