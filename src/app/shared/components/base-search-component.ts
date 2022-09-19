import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { I18NextPipe } from 'angular-i18next';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State } from 'src/app/components/base/reducers/base.reducer';
import {
  getSideNav,
  getSearch,
} from 'src/app/components/base/reducers/base.selectors';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';

export class BaseSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  subs: Subscription[] = [];
  modulePath: string;
  searchSubscription: Subscription;
  form: FormGroup;

  sidenavData$: Observable<any>;
  sidenavData: any;

  searchData$: Observable<any>;
  searchData: any;
  searchFormInterval: any = null;
  searchGetSideNav = getSideNav;

  actionRequestPostSearch: any;

  booleanOptions: Array<{ label: string; value: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: '',
    },
    {
      label: this.i18nextPipe.transform('translation:yes'),
      value: 'true',
    },
    {
      label: this.i18nextPipe.transform('translation:no'),
      value: 'false',
    },
  ];

  curiaStatusesOptions: Array<{ label: string; value: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: '',
    },
    {
      label: this.i18nextPipe.transform('translation:curia_status.approved'),
      value: 'approved',
    },
    {
      label: this.i18nextPipe.transform('translation:curia_status.rejected'),
      value: 'rejected',
    },
    {
      label: this.i18nextPipe.transform('translation:curia_status.in_progress'),
      value: 'in_progress',
    },
    {
      label: this.i18nextPipe.transform(
        'translation:curia_status.waiting_for_docs'
      ),
      value: 'waiting_for_docs',
    },
  ];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.watchSearchChanges();

      this.sidenavData$ = this.store.select(this.searchGetSideNav);
      this.subs.push(
        this.sidenavData$.subscribe((r) => {
          if (r) {
            this.sidenavData = r;
            this.afterSideNavLoaded();
          }
        })
      );
    });
  }

  afterSideNavLoaded() {}

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({}),
    });
  }

  onSearchClick() {
    this.updateSearchWords(this.form.value.searchFields);
    this.search();
  }

  search() {
    if (this.sidenavData) {
      const formSearchFields = this.form.value.searchFields;
      const fields = {};
      Object.keys(formSearchFields).forEach((key: string) => {
        if (
          ![null, undefined, '', 'null'].includes(formSearchFields[key].value)
        ) {
          fields[key] = formSearchFields[key].value;
        }
      });
      this.sidenavData.searchFunctionAction(fields);
    }
  }

  clearSearch() {
    this.refreshTopBar();
    this.buildForm();
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

      this.form.get('searchWord').setValue(searchString);
    });
    this.refreshTopBar(searchString);
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    return `${searchWordLabel}:(${value}) `;
  }

  refreshTopBar(searchString: string = '') {
    const search = {
      searchWord: searchString,
    };
    this.store.dispatch(new this.actionRequestPostSearch(search));
  }

  watchSearchChanges() {
    this.searchData$ = this.store.select(getSearch);
    this.subs.push(
      this.searchData$.subscribe((r) => {
        if (r) {
          this.updateSearchFields(r.searchWord);
          this.search();
        }
      })
    );
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

    const formSearchFields = this.form.value.searchFields;
    // Manage main field search when there is no ':('
    if (!searchWord.includes(':(')) {
      this.form.get('searchWord').setValue(searchWord);
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

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    this.form.get('searchFields').get(field).get('value').setValue(newValue);
  }
}
