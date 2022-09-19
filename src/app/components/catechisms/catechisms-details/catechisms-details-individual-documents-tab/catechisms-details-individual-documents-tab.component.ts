import {
  Component,
  Input,
  AfterViewInit,
  TemplateRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { environment } from 'src/environments/environment';
import { CatechismIndividualDocumentResponse } from 'src/app/components/catechisms/catechism.model';
import {
  RequestGetAllIndividualDocuments,
  ClearGetAllIndividualDocuments,
} from 'src/app/components/catechisms/reducers/catechisms.actions';
import { getIndividualDocumentsList } from 'src/app/components/catechisms/reducers/catechisms.selectors';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuHelperService } from 'src/app/components/base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import {
  RequestGetByEntityId,
  ClearGetByEntityId,
} from 'src/app/components/persons/reducers/persons.actions';
import { getPersonByEntityId } from 'src/app/components/persons/reducers/persons.selectors';
import { EntityPerson } from 'src/app/components/persons/person.model';

@Component({
  selector: 'kyr-catechisms-details-individual-documents-tab',
  templateUrl: './catechisms-details-individual-documents-tab.component.html',
})
export class CatechismsDetailsIndividualDocumentsTabComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() modulePath: string;
  @Input() catechismId: number;

  appName = 'catechisms';
  modelList$: Observable<CatechismIndividualDocumentResponse>;
  viewName = 'Catechism';

  selectorGetList = getIndividualDocumentsList;
  actionRequestGetAll = RequestGetAllIndividualDocuments;
  actionClearGetAll = ClearGetAllIndividualDocuments;

  @ViewChild('entityDescriptionReportTemplate')
  entityDescriptionReportTemplate: TemplateRef<any>;
  @ViewChild('inscriptionReportTemplate')
  inscriptionReportTemplate: TemplateRef<any>;
  @ViewChild('historicReportTemplate')
  historicReportTemplate: TemplateRef<any>;
  @ViewChild('attendanceSheetReportTemplate')
  attendanceSheetReportTemplate: TemplateRef<any>;
  @ViewChild('transferReportTemplate')
  transferReportTemplate: TemplateRef<any>;

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public actionSubject: ActionsSubject,
    public store: Store<any>,
    public menuHelperService: MenuHelperService,
    public http: HttpClient,
    public fb: FormBuilder,
    private personsStore: Store<PersonsState>
  ) {
    super(
      titleService,
      router,
      route,
      i18nextPipe,
      sharedModule,
      actionSubject,
      store,
      menuHelperService,
      http,
      fb
    );
  }

  ngOnInit() {
    this.filters = {
      catechism_id: this.catechismId,
    };
    super.ngOnInit();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_individual_documents.entity_description`
        ),
        template: this.entityDescriptionReportTemplate,
        stopRowClickPropagation: true,
      },
      {
        id: 'doc_inscription_url',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_individual_documents.doc_inscription_url`
        ),
        template: this.inscriptionReportTemplate,
        sortable: false,
        stopRowClickPropagation: true,
      },
      {
        id: 'doc_historic_url',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_individual_documents.doc_historic_url`
        ),
        template: this.historicReportTemplate,
        sortable: false,
        stopRowClickPropagation: true,
      },
      {
        id: 'doc_attendance_sheet_url',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_individual_documents.doc_attendance_sheet_url`
        ),
        template: this.attendanceSheetReportTemplate,
        sortable: false,
        stopRowClickPropagation: true,
      },
      {
        id: 'doc_transfer_url',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_individual_documents.doc_transfer_url`
        ),
        template: this.transferReportTemplate,
        sortable: false,
        stopRowClickPropagation: true,
      },
    ];
  }

  setSideNav() {
    // Must do nothing in order to not interfere with search
  }

  openReport(catechismId: number, reportUrl: string) {
    window.open(
      `${environment.railsAppUrl}/catechisms/${catechismId}${reportUrl}`,
      '_blank'
    );
  }

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (modulePath === 'persons') {
      this.personsStore.dispatch(new RequestGetByEntityId(id));
      let getEntity$: Subscription = this.personsStore
        .select(getPersonByEntityId)
        .subscribe((person: EntityPerson) => {
          if (person) {
            getEntity$.unsubscribe();
            this.personsStore.dispatch(new ClearGetByEntityId());
            window.open(`${modulePath}/${person.id}/details`, '_blank');
          }
        });
    } else {
      super.openDetails(modulePath, id, railsApp);
    }
  }
}
