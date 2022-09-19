import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModalListComponent } from '../base-modal-list-component';

import { getError, getReports } from './reducers/reports-modal.selectors';
import * as actions from './reducers/reports-modal.actions';
import { ReportResponse } from './reports-modal.model';

@Component({
  selector: 'kyr-reports-modal',
  templateUrl: './reports-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'reports';
  modelList$: Observable<ReportResponse>;

  selectorGetList = getReports;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('enabledTemplate') enabledTemplate: TemplateRef<any>;
  @ViewChild('indexReportTemplate') indexReportTemplate: TemplateRef<any>;
  @ViewChild('reportNameTemplate') reportNameTemplate: TemplateRef<any>;
  @ViewChild('reportPathTemplate') reportPathTemplate: TemplateRef<any>;
  @ViewChild('viewDescriptionTemplate')
  viewDescriptionTemplate: TemplateRef<any>;
  @ViewChild('reportLocaleTemplate')
  reportLocaleTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
        template: this.reportNameTemplate,
      },
      {
        id: 'report_path',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.report_path`
        ),
        template: this.reportPathTemplate,
      },
      {
        id: 'view_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.view_description`
        ),
        template: this.viewDescriptionTemplate,
      },
      {
        id: 'report_locale',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.report_locale`
        ),
        template: this.reportLocaleTemplate,
      },
      {
        id: 'index_report',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.index_report`
        ),
        sortable: false,
        template: this.indexReportTemplate,
      },
      {
        id: 'enabled',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.enabled`),
        sortable: false,
        template: this.enabledTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          value: null,
          mainField: true,
        }),
        view_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.view_description`
          ),
          value: null,
          mainField: true,
        }),
        report_locale: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.report_locale`
          ),
          value: null,
        }),
        enabled: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.enabled`
          ),
          value: null,
        }),
      }),
    });
  }
}
