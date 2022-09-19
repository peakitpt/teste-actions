import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './contents.reducer';
import { ContentResponse, Content } from '../content.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getContents = createFeatureSelector('contents');

export const getError = createSelector(
  getContents,
  (state: State) => state.error
);

export const getContentsList = createSelector(getContents, (state: State) => {
  return state.contents as ContentResponse;
});

export const getContentsListEntirely = createSelector(
  getContents,
  (state: State) => {
    return state.contentsEntirely;
  }
);

export const getContent = createSelector(getContents, (state: State) => {
  return state.content as Content;
});

export const getSelectedContents = createSelector(
  getContents,
  (state: State) => {
    return state.selectedIds as Content[];
  }
);

export const getModalRowContent = createSelector(
  getContents,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
