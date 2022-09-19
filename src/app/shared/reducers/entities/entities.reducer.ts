import { Action } from '@ngrx/store';
import * as actions from './entities.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Entity } from './entity.model';

export interface State {
  entity: Entity;
  error: RequestError;
}

export const initialState: State = {
  entity: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let entity: Entity;

  switch (action.type) {
    case actions.EntitiesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.EntitiesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.EntitiesActionTypes.SuccessGet:
      entity = (action as actions.SuccessGet).payload;
      return { ...state, entity };

    default:
      return state;
  }
}
