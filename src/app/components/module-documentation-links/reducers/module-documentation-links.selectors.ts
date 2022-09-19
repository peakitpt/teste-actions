import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './module-documentation-links.reducer';
import {
  ModuleDocumentationLinkResponse,
  ModuleDocumentationLink,
} from '../module-documentation-link.model';

export const getModuleDocumentationLinks = createFeatureSelector(
  'module-documentation-links'
);

export const getError = createSelector(
  getModuleDocumentationLinks,
  (state: State) => state.error
);

export const getModuleDocumentationLinksList = createSelector(
  getModuleDocumentationLinks,
  (state: State) => {
    return state.moduleDocumentationLinks as ModuleDocumentationLinkResponse;
  }
);

export const getModuleDocumentationLinksListEntirely = createSelector(
  getModuleDocumentationLinks,
  (state: State) => {
    return state.moduleDocumentationLinksEntirely as ModuleDocumentationLinkResponse;
  }
);

export const getModuleDocumentationLink = createSelector(
  getModuleDocumentationLinks,
  (state: State) => {
    return state.moduleDocumentationLink as ModuleDocumentationLink;
  }
);

export const getSelectedModuleDocumentationLinks = createSelector(
  getModuleDocumentationLinks,
  (state: State) => {
    return state.selectedIds as ModuleDocumentationLink[];
  }
);
