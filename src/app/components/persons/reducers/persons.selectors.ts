import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './persons.reducer';
import { EntityPersonResponse, EntityPerson } from '../person.model';
import { TaxpayerNameValidation } from '@peakitpt/ui-kyrios-api';

export const getPersons = createFeatureSelector('persons');

export const getError = createSelector(
  getPersons,
  (state: State) => state.error
);

export const getPersonsList = createSelector(getPersons, (state: State) => {
  return state.persons as EntityPersonResponse;
});

export const getPersonsListEntirely = createSelector(
  getPersons,
  (state: State) => {
    return state.personsEntirely as EntityPersonResponse;
  }
);

export const getPerson = createSelector(getPersons, (state: State) => {
  return state.person as EntityPerson;
});

export const getSelectedPersons = createSelector(getPersons, (state: State) => {
  return state.selectedIds as EntityPerson[];
});

export const getPersonByEntityId = createSelector(
  getPersons,
  (state: State) => {
    return state.personByEntityId as EntityPerson;
  }
);

export const getTaxpayerNameValidation = createSelector(
  getPersons,
  (state: State) => {
    return state.taxpayerNameValidation as TaxpayerNameValidation;
  }
);
