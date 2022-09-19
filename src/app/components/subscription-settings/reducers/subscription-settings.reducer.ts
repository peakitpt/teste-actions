import { Action } from '@ngrx/store';
import * as actions from './subscription-settings.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SubscriptionSetting } from '../subscription-setting.model';

export interface State {
  subscriptionSetting: SubscriptionSetting;
  error: RequestError;
}

export const initialState: State = {
  subscriptionSetting: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let subscriptionSetting: any;

  switch (action.type) {
    case actions.SubscriptionSettingsActionTypes
      .RequestFailSubscriptionSettings:
      const error = (action as actions.RequestFailSubscriptionSettings).payload;
      return { ...state, error };

    case actions.SubscriptionSettingsActionTypes
      .RequestGetFromSubscriptionSetting:
      return { ...state, error: null };

    case actions.SubscriptionSettingsActionTypes
      .SuccessGetFromSubscriptionSetting:
      subscriptionSetting = (action as actions.SuccessGetFromSubscriptionSetting)
        .payload;
      return { ...state, subscriptionSetting };

    case actions.SubscriptionSettingsActionTypes.RequestGetSubscriptionSetting:
      return { ...state, error: null };

    case actions.SubscriptionSettingsActionTypes.SuccessGetSubscriptionSetting:
      subscriptionSetting = (action as actions.SuccessGetSubscriptionSetting)
        .payload;
      return { ...state, subscriptionSetting };

    case actions.SubscriptionSettingsActionTypes.RequestPostSubscriptionSetting:
      return { ...state, error: null };

    case actions.SubscriptionSettingsActionTypes.SuccessPostSubscriptionSetting:
      subscriptionSetting = (action as actions.SuccessPostSubscriptionSetting)
        .payload;
      return { ...state, subscriptionSetting };

    default:
      return state;
  }
}
