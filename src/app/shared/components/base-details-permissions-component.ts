import { TableDataSource, SnackBarService } from '@peakitpt/ui-material';
import { EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormGroup } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store, ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseDetailsComponent } from './base-details-component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

export class BaseDetailsPermissionsComponent extends BaseDetailsComponent {
  modulePerms: string[] = [];

  form: FormGroup;

  // Table Datasource
  permissionsAttributesDS: TableDataSource<any> = new TableDataSource([]);

  // Checkbox selection
  initialSelection: any[] = [];
  allowMultiSelect = true;
  selection: SelectionModel<any> = new SelectionModel<any>(
    this.allowMultiSelect,
    this.initialSelection
  );
  checkboxSelectionEvent = new EventEmitter();

  moduleForm = new FormControl();
  moduleOptions: any[];
  appForm = new FormControl();
  appOptions: any[];

  appModuleRelations = this.sharedModule.getAppModuleRelations();

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      matDialog,
      i18nextPipe,
      http,
      actionSubject,
      snackBarService
    );
    this.moduleForm.valueChanges.subscribe((v) => {
      this.permissionsAttributesDS.filter = JSON.stringify({
        app: this.appForm.value,
        module: v,
      });
    });
    this.appForm.valueChanges.subscribe((v) => {
      this.permissionsAttributesDS.filter = JSON.stringify({
        app: v,
        module: this.moduleForm.value,
      });
    });
    this.moduleOptions = [];
    this.appOptions = [];
  }

  isAllSelected() {
    for (const moduleId of this.permissionsAttributesDS.filteredData.map(
      (v) => v.module
    )) {
      if (
        !this.selection.selected.map((v: any) => v.module).includes(moduleId)
      ) {
        return false;
      }
    }
    return true;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.permissionsAttributesDS.filteredData.forEach((row) =>
          this.selection.deselect(row)
        )
      : this.permissionsAttributesDS.filteredData.forEach((row) =>
          this.selection.select(row)
        );
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  checkboxEvent() {
    this.checkboxSelectionEvent.emit(this.selection.selected);
  }

  fillPermissionsDataSource(v: any) {
    const permissionsAttributesList = [];
    this.moduleOptions = [];
    this.appOptions = [];
    this.appModuleRelations
      .filter((rel) => this.modulePerms.includes(rel.module))
      .forEach((appModuleRelation) => {
        this.moduleOptions.push({
          label: this.i18nextPipe.transform(
            'translation:subscription_modules_permission_attributes.' +
              appModuleRelation.module
          ),
          value: appModuleRelation.module,
        });
        if (
          !this.appOptions.length ||
          this.appOptions[this.appOptions.length - 1].value !==
            appModuleRelation.app
        ) {
          this.appOptions.push({
            label: this.i18nextPipe.transform(
              'translation:apps.' + appModuleRelation.app
            ),
            value: appModuleRelation.app,
          });
        }

        permissionsAttributesList.push({
          app: this.i18nextPipe.transform(
            'translation:apps.' + appModuleRelation.app
          ),
          value: new FormControl(v[appModuleRelation.module]),
          id: appModuleRelation.module,
          module: this.i18nextPipe.transform(
            'translation:subscription_modules_permission_attributes.' +
              appModuleRelation.module
          ),
        });
      });
    this.permissionsAttributesDS = new TableDataSource(
      permissionsAttributesList
    );
    for (const p of this.permissionsAttributesDS.filteredData) {
      if (p.value.value) {
        this.selection.select(p);
      }
    }

    this.permissionsAttributesDS.filterPredicate = (
      data: any,
      filter: string
    ) => {
      const filters = JSON.parse(filter);
      const keys = Object.keys(filters);
      const anyFilter = filter.length && keys.length;
      let respectsFilters = true;
      if (anyFilter) {
        for (let i = 0; respectsFilters && i < keys.length; i++) {
          const key = keys[i];
          if (filters[key] !== null) {
            respectsFilters = data[key]
              .toLowerCase()
              .includes(filters[key].toLowerCase());
          }
        }
      }

      return !anyFilter || respectsFilters;
    };
  }

  getPermissionsDataSourceOnSubmit() {
    const trueMaps = this.selection.selected.map((v) => v.id);
    const perms = {};
    for (const moduleId of Object.keys(
      this.form.get('subscription_modules_permission_attributes').value
    )) {
      perms[moduleId] = trueMaps.includes(moduleId);
    }
    this.form.get('subscription_modules_permission_attributes').setValue(perms);
  }
}
