import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './user-newsletters.reducer';
import {
  UserNewsletterResponse,
  UserNewsletter
} from '../user-newsletter.model';

export const getUserNewsletters = createFeatureSelector('user-newsletters');

export const getError = createSelector(
  getUserNewsletters,
  (state: State) => state.error
);

export const getUserNewslettersList = createSelector(
  getUserNewsletters,
  (state: State) => {
    return state.userNewsletters as UserNewsletterResponse;
  }
);

export const getUserNewslettersListEntirely = createSelector(
  getUserNewsletters,
  (state: State) => {
    return state.userNewslettersEntirely as UserNewsletterResponse;
  }
);

export const getUserNewsletter = createSelector(
  getUserNewsletters,
  (state: State) => {
    return state.userNewsletter as UserNewsletter;
  }
);

export const getSelectedUserNewsletters = createSelector(
  getUserNewsletters,
  (state: State) => {
    return state.selectedIds as UserNewsletter[];
  }
);
