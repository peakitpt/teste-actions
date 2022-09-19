import { Action } from '@ngrx/store';
import * as actions from './formations.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Formation, FormationResponse } from '../formation.model';

export interface State {
  formations: FormationResponse;
  formationsEntirely: FormationResponse;
  formation: Formation;
  selectedIds: Formation[];
  error: RequestError;
}

export const initialState: State = {
  formations: null,
  formationsEntirely: null,
  formation: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let formations: any;
  let formationsEntirely: any;
  let formation: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.FormationsActionTypes.RequestFailFormations:
      const error = (action as actions.RequestFailFormations).payload;
      return { ...state, error };

    case actions.FormationsActionTypes.RequestGetAllFormations:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessGetAllFormations:
      formations = (action as actions.SuccessGetAllFormations).payload;
      return { ...state, formations };

    case actions.FormationsActionTypes.RequestGetFormation:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessGetFormation:
      formation = (action as actions.SuccessGetFormation).payload;
      return { ...state, formation };

    case actions.FormationsActionTypes.RequestPostFormation:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessPostFormation:
      formation = (action as actions.SuccessPostFormation).payload;
      return { ...state, formation };

    case actions.FormationsActionTypes.RequestPutFormation:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessPutFormation:
      formation = (action as actions.SuccessPutFormation).payload;
      return { ...state, formation };

    case actions.FormationsActionTypes.RequestDeleteFormation:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessDeleteFormation:
      formation = (action as actions.SuccessDeleteFormation).payload;
      return { ...state, formation };

    // case actions.FormationsActionTypes.RequestBulkDeleteFormations:
    //   return { ...state, error: null };

    // case actions.FormationsActionTypes.SuccessBulkDeleteFormations:
    //   formation = (action as actions.SuccessBulkDeleteFormations).payload;
    //   return { ...state, formation };

    case actions.FormationsActionTypes.RequestSendTestFormation:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessSendTestFormation:
      formation = (action as actions.SuccessSendTestFormation).payload;
      return { ...state, formation };

    case actions.FormationsActionTypes.SetSelectedFormations:
      selectedIds = (action as actions.SetSelectedFormations).payload;
      return { ...state, selectedIds };

    case actions.FormationsActionTypes.RequestGetEntirelyFormations:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessGetEntirelyFormations:
      formationsEntirely = (action as actions.SuccessGetEntirelyFormations)
        .payload;
      return { ...state, formationsEntirely };

    default:
      return state;
  }
}
