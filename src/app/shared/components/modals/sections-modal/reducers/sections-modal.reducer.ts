import { Action } from '@ngrx/store';
import * as actions from './sections-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SectionsResponse } from '../sections-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  sections: SectionsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  sections: { results: [] } as SectionsResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let sections: SectionsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.SectionsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.SectionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessGetAll:
      sections = (action as actions.SuccessGetAll).payload;
      return { ...state, sections };

    case actions.SectionsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
