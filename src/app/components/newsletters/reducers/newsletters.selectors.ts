import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './newsletters.reducer';
import { NewsletterResponse, Newsletter } from '../newsletter.model';

export const getNewsletters = createFeatureSelector('newsletters');

export const getError = createSelector(
  getNewsletters,
  (state: State) => state.error
);

export const getNewslettersList = createSelector(
  getNewsletters,
  (state: State) => {
    return state.newsletters as NewsletterResponse;
  }
);

export const getNewslettersListEntirely = createSelector(
  getNewsletters,
  (state: State) => {
    return state.newslettersEntirely as NewsletterResponse;
  }
);

export const getNewsletter = createSelector(getNewsletters, (state: State) => {
  return state.newsletter as Newsletter;
});

export const getSelectedNewsletters = createSelector(
  getNewsletters,
  (state: State) => {
    return state.selectedIds as Newsletter[];
  }
);
