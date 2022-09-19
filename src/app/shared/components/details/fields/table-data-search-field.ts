import { TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Selector, Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisibleField } from './visible-field';

export class TableDataSearchField extends VisibleField {
  type: string = 'tabledatasearch';
  searchFields: FormGroup = new FormGroup({});
  fields: any[] = [];
  fb: FormBuilder;
  
  searchForm: FormGroup = new FormGroup({});

  selectorGetList: Selector<any, any>;
  actionRequestGetAll: any;

  limit: number = 5;
  page: number;
  tableColumns: any[] = [];
  filters: any = {};
  sort: string;
  order: string;
  store: Store<any>;
  id: any;
  sharedModule: SharedModule;

  public constructor(init?:Partial<TableDataSearchField>) {
    super();
    Object.assign(this, init);
    this.buildSearchForm();
    this.fields.forEach((field: any) => {
      if (field.type === 'dateRangeInput') {
        this.searchFields.addControl(field.name + "_start", this.fb.group({ searchWordLabel: field.label + "_start", value: field.value, mainField: field.mainField ? true : false}));
        this.searchFields.addControl(field.name + "_end", this.fb.group({ searchWordLabel: field.label + "_end", value: field.value, mainField: field.mainField ? true : false}));
      } else {
        this.searchFields.addControl(field.name, this.fb.group({ searchWordLabel: field.label, value: field.value, mainField: field.mainField ? true : false}));
      }
    });
  }


  buildSearchForm() {
    this.searchForm = this.fb.group({
      searchWord: [],
      searchFields: this.searchFields
    });
  }

  clearSearch() {
    this.searchForm.reset();
    this.buildSearchForm();
    this.search();
  }

  search() {
    const newFilter = {};

    Object.keys(this.searchForm.value.searchFields).forEach((field: string) => {
      newFilter[field] = this.searchForm.value.searchFields[field].value;
    });
    this.filters = newFilter;
    this.refreshTable();
  }

  searchFieldSearch() {
    this.updateSearchWords(this.searchForm.value.searchFields);
    this.search();
  }

  updateSearchWords(data: any) {
    let searchString = '';

    Object.keys(data).forEach((key: string) => {
      if (![null, undefined, '', 'null'].includes(data[key].value)) {
        searchString += this.searchStringBuilder(
          data[key].searchWordLabel,
          data[key].value,
          key
        );
      }

      this.searchForm.get('searchWord').setValue(searchString);
    });
  }

  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    const filtered: any[] = this.fields.filter((f: any) => f.name === field || `${f.name}_start` === field || `${f.name}_end` === field);
    const searchField = filtered.length > 0 ? filtered[0] : { type: null };

    switch (searchField.type) {
      case "dateRangeInput":
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case "inputSelect":
        return `${searchWordLabel}:(${
          searchField.options.find((o) => o.value === value).label
        }) `;
      default:
        return `${searchWordLabel}:(${value}) `;
    }
  }

  refreshTable() {
    this.store.dispatch(
      new this.actionRequestGetAll({
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
        id: this.id,
      })
    );
  };

  searchWordSearch() {
    this.updateSearchFields(this.searchForm.value.searchWord);
    this.search();
  }

  updateSearchFields(searchWord: string = '') {
    const fieldsObject = {};

    if (searchWord) {
      // Removes last trailing whitespace
      if (searchWord.slice(-1) === ' ') {
        searchWord = searchWord.slice(0, -1);
      }

      // Divides on braquet close + whitespace
      const fieldsArray = searchWord.split(') ');
      for (const item of fieldsArray) {
        const itemArray = item.split(':(', 2);
        if (itemArray[1] && itemArray[1].slice(-1) === ')') {
          // Removes last close braquet in case its forgoten
          itemArray[1] = itemArray[1].slice(0, -1);
        }
        if (itemArray[1]) {
          // Add to object only if it has a value
          fieldsObject[itemArray[0]] = itemArray[1];
        }
      }
    }

    const formSearchFields = this.searchForm.value.searchFields;
    // Manage main field search when there is no ':('
    if (!searchWord?.includes(':(')) {
      this.searchForm.get('searchWord').setValue(searchWord);
      Object.keys(formSearchFields).forEach((field) => {
        if (formSearchFields[field].mainField === true) {
          this.updateField(field, searchWord);
        } else {
          this.updateField(field, null);
        }
      });
    } else {
      // If the key matches the label, add it to the search fields

      Object.keys(formSearchFields).forEach((field: string) => {
        if (fieldsObject[formSearchFields[field].searchWordLabel]) {
          this.updateField(
            field,
            fieldsObject[formSearchFields[field].searchWordLabel]
          );
        } else {
          this.updateField(field, null);
        }
      });
    }
  }

  updateField(field: string, newValue: any) {
    this.searchForm
      .get('searchFields')
      .get(field)
      .get('value')
      .setValue(newValue);
  }

}