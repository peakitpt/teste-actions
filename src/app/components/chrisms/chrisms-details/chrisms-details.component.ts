import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Chrism, ChrismEntity } from '../chrism.model';
import * as actions from '../reducers/chrisms.actions';
import {
  getChrism,
  getChrismEntitiesFormReports,
  getChrismEntitiesFormSubscriptionReports,
} from '../reducers/chrisms.selectors';
import {
  Report,
  ReportResponse,
  SubscriptionReport,
} from 'src/app/components/reports/report.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-chrisms-details',
  templateUrl: './chrisms-details.component.html',
  styleUrls: ['./chrisms-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChrismsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Chrism>;
  model: Chrism;
  returnUrl = '/chrisms';
  modulePath = 'chrisms';
  viewName = 'Chrism';

  // Chrism Entities Reports
  railsChrismEntitiesReportsList = [];
  carboneChrismEntitiesReportsList = [];
  chrismEntitiesReports$: Observable<ReportResponse>;
  subscriptionChrismEntitiesReports$: Observable<ReportResponse>;
  chrismEntitiesReportMenuOptionsModel: Array<{
    name?: string;
    value?: any;
    icon?: string;
    isSeparator?: boolean;
  }> = [];

  // Selectors & actions
  selectorGetModel = getChrism;
  actionRequestFail = actions.ChrismsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;
  // Selectors & actions END

  ngOnInit() {
    super.ngOnInit();
    this.getChrismEntitiesReports();
    this.getChrismEntitiesSubscriptionReports();
  }

  menuClick(event: any, data: any) {
    switch (event) {
      case 'view_doc':
        this.openDetails('documents', data.document_id);
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  getChrismEntitiesReports() {
    // Get Carbone reports list
    const filter = {
      module: 'ChrismsEntity',
      report_type: 'Form',
    };
    this.chrismEntitiesReports$ = this.store.select(
      getChrismEntitiesFormReports
    );
    this.store.dispatch(
      new actions.RequestGetChrismEntitiesFormReports({
        query: filter,
        page: 0,
        limit: 'all',
      })
    );

    this.subs.push(
      this.chrismEntitiesReports$.subscribe((result: any) => {
        this.carboneChrismEntitiesReportsList = [];
        if (result) {
          result.results.forEach((rep: Report) => {
            this.carboneChrismEntitiesReportsList.push({
              name: rep.name,
              value: {
                fileName: rep.report_file,
                fileType: rep.export_type,
              },
              icon: this.fileIcons[rep.export_type],
            });
          });
          if (this.carboneChrismEntitiesReportsList.length) {
            this.joinChrismEntitiesReports();
          }
        }
      })
    );
  }

  getChrismEntitiesSubscriptionReports() {
    // Get Rails Reports list
    const params = {
      view: 'ChrismsEntity',
      index_report: false,
    };
    this.subscriptionChrismEntitiesReports$ = this.store.select(
      getChrismEntitiesFormSubscriptionReports
    );
    this.store.dispatch(
      new actions.RequestGetChrismEntitiesFormSubscriptionReports(params)
    );

    this.subs.push(
      this.subscriptionChrismEntitiesReports$.subscribe((result: any) => {
        this.railsChrismEntitiesReportsList = [];
        if (result) {
          result.forEach((group: any) => {
            group.reports.forEach((rep: SubscriptionReport) => {
              this.railsChrismEntitiesReportsList.push({
                name: rep.report_name,
                value: {
                  fileName: rep.report_name,
                  fileType: 'pdf',
                  isRailsReport: true,
                  filePath: rep.report_path,
                },
                icon: 'picture_as_pdf',
              });
            });
          });
          if (this.railsChrismEntitiesReportsList.length) {
            this.joinChrismEntitiesReports();
          }
        }
      })
    );
  }

  joinChrismEntitiesReports() {
    this.chrismEntitiesReportMenuOptionsModel =
      this.carboneChrismEntitiesReportsList;

    if (
      this.carboneChrismEntitiesReportsList.length &&
      this.railsChrismEntitiesReportsList.length
    ) {
      this.chrismEntitiesReportMenuOptionsModel.push({ isSeparator: true });
    }

    this.chrismEntitiesReportMenuOptionsModel.push(
      ...this.railsChrismEntitiesReportsList
    );
  }

  chrismEntitiesReportMenuClick(file: any, chrismEntity: ChrismEntity) {
    if (file.isRailsReport !== true) {
      this.subs.push(
        this.model$.subscribe((response: any) => {
          const url = `${environment.reportsUrl}?filePath=${file.fileName}&convertTo=${file.fileType}`;
          this.subs.push(
            this.http
              .post(url, response, { responseType: 'blob' })
              .subscribe((r) => {
                this.openFileNewTab(r, file.fileType);
              })
          );
        })
      );
    } else {
      this.openRailsReport(file, chrismEntity);
    }
  }

  openRailsReport(file: any, chrismEntity: ChrismEntity) {
    if (this.model?.id) {
      const url = `${
        environment.railsAppUrl
      }/${this.modulePath.toLowerCase()}/${this.model.id}/chrisms_entities/${
        chrismEntity.id
      }/printpdf?format=pdf&file=${file.filePath}`;
      window.open(url);
    }
  }

  addTreasuryDocsOptions() {
    this.treasuryDocOptionsMenu = [
      {
        icon: 'visibility',
        name: this.i18nextPipe.transform(
          'documents:action.treasury_doc.view_doc'
        ),
        value: 'view_doc',
      },
      {
        icon: 'download',
        name: this.i18nextPipe.transform(
          'documents:action.treasury_doc.download_doc'
        ),
        value: 'download_doc',
      },
    ];
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
