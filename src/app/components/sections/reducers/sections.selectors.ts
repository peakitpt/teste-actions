import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './sections.reducer';
import { SectionResponse, Section } from '../section.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getSections = createFeatureSelector('sections');

export const getError = createSelector(
  getSections,
  (state: State) => state.error
);

export const getSectionsList = createSelector(getSections, (state: State) => {
  return state.sections as SectionResponse;
});

export const getSectionsListEntirely = createSelector(
  getSections,
  (state: State) => {
    return state.sectionsEntirely as SectionResponse;
  }
);

export const getSection = createSelector(getSections, (state: State) => {
  return state.section as Section;
});

export const getSelectedSections = createSelector(
  getSections,
  (state: State) => {
    return state.selectedIds as Section[];
  }
);

export const getModalRowSection = createSelector(
  getSections,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
