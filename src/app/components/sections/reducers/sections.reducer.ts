import { SelectedModalRow } from './../../../shared/shared.model';
import { Action } from '@ngrx/store';
import * as actions from './sections.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Section, SectionResponse } from '../section.model';

export interface State {
  sections: SectionResponse;
  sectionsEntirely: SectionResponse;
  section: Section;
  selectedIds: Section[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  sections: null,
  sectionsEntirely: null,
  section: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let sections: any;
  let sectionsEntirely: any;
  let section: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.SectionsActionTypes.RequestFailSections:
      const error = (action as actions.RequestFailSections).payload;
      return { ...state, error };

    case actions.SectionsActionTypes.RequestGetAllSections:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessGetAllSections:
      sections = (action as actions.SuccessGetAllSections).payload;
      return { ...state, sections };

    case actions.SectionsActionTypes.RequestGetSection:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessGetSection:
      section = (action as actions.SuccessGetSection).payload;
      return { ...state, section };

    case actions.SectionsActionTypes.RequestPostSection:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessPostSection:
      section = (action as actions.SuccessPostSection).payload;
      return { ...state, section };

    case actions.SectionsActionTypes.RequestPutSection:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessPutSection:
      section = (action as actions.SuccessPutSection).payload;
      return { ...state, section };

    case actions.SectionsActionTypes.RequestDeleteSection:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessDeleteSection:
      section = (action as actions.SuccessDeleteSection).payload;
      return { ...state, section };

    // case actions.SectionsActionTypes.RequestBulkDeleteSections:
    //   return { ...state, error: null };

    // case actions.SectionsActionTypes.SuccessBulkDeleteSections:
    //   section = (action as actions.SuccessBulkDeleteSections).payload;
    //   return { ...state, section };

    case actions.SectionsActionTypes.RequestSendTestSection:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessSendTestSection:
      section = (action as actions.SuccessSendTestSection).payload;
      return { ...state, section };

    case actions.SectionsActionTypes.SetSelectedSections:
      selectedIds = (action as actions.SetSelectedSections).payload;
      return { ...state, selectedIds };

    case actions.SectionsActionTypes.SetModalSelectSection:
      modalRowSelect = (action as actions.SetModalSelectSection).payload;
      return { ...state, modalRowSelect };

    case actions.SectionsActionTypes.RequestGetEntirelySections:
      return { ...state, error: null };

    case actions.SectionsActionTypes.SuccessGetEntirelySections:
      sectionsEntirely = (action as actions.SuccessGetEntirelySections).payload;
      return { ...state, sectionsEntirely };

    default:
      return state;
  }
}
