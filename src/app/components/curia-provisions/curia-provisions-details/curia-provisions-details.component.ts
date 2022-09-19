import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/curia-provisions.actions';
import { getCuriaProvision } from '../reducers/curia-provisions.selectors';
import { Observable } from 'rxjs';
import { CuriaProvision } from '../curia-provision.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { Tab } from 'src/app/shared/components/details/fields/tab-field';
import { Section } from 'src/app/shared/components/details/fields/section-field';
import { TableField } from 'src/app/shared/components/details/fields/table-field';
import { TextField } from 'src/app/shared/components/details/fields/text-field';
import { DateField } from 'src/app/shared/components/details/fields/date-field';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { environment } from 'src/environments/environment';

import { IconField } from 'src/app/shared/components/details/fields/icon-field';
import { TemplateField } from 'src/app/shared/components/details/fields/template-field';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kyr-curia-provisions-details',
  templateUrl: './curia-provisions-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaProvisionsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CuriaProvision>;
  returnUrl = '/curia-provisions';
  modulePath = 'curia-provisions';
  viewName = 'CuriaProvision';

  detailsFields: Tab[] = [];
  @ViewChild('freeDescriptionTemplate')
  freeDescriptionTemplate: TemplateRef<any>;
  dataSourceAttachments: TableDataSource<any> = new TableDataSource([]);
  dataSourceColumnsAttachments: any[] = [];
  @ViewChild('attachmentLinkTemplate') attachmentLinkTemplate: TemplateRef<any>;
  @ViewChild('function_descriptionLinkTemplate')
  function_descriptionLinkTemplate: TemplateRef<any>;
  dataSourceMembers: TableDataSource<any> = new TableDataSource([]);
  dataSourceColumnsMembers: any[] = [];

  selectorGetModel = getCuriaProvision;
  actionRequestFail =
    actions.CuriaProvisionsActionTypes.RequestFailCuriaProvisions;
  actionRequestGetOne = actions.RequestGetCuriaProvision;
  actionClearGet = actions.ClearGet;

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
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
    ];
  }

  menuClick(event: any, data: any) {
    switch (event) {
      case 'generate_doc':
        this.modal.close();
        this.navigate(`/${this.modulePath}/${this.id}/emit_document`);
        break;
      case 'view_doc':
        this.openDetails('documents', this.model.receipt_id);
        break;
      case 'download_doc':
        if (this.model.receipt_id) {
          window.open(
            `${environment.railsAppUrl}/documents/${this.model.receipt_id}/printpdf?format=pdf&file=documento`,
            '_blank'
          );
        }
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  afterGetModel() {
    super.afterGetModel();
    this.buildDataSources();
    this.buildFields();
  }

  buildDataSources() {
    this.dataSourceAttachments.data = this.model.curia_provision_attachments;
    this.dataSourceColumnsAttachments = [
      {
        id: 'attachemnt_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.attachment`
        ),
        template: this.attachmentLinkTemplate,
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
    ];

    this.dataSourceMembers.data = this.model.curia_provision_members;
    this.dataSourceColumnsMembers = [
      {
        id: 'function_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.function_description`
        ),
        template: this.function_descriptionLinkTemplate,
      },
      {
        id: 'member_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.member_description`
        ),
      },
    ];
  }

  buildFields() {
    this.detailsFields = [
      new Tab({
        name: 'provision',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':header.provision'
        ),
        fields: [
          new Section({
            id: 'provision',
            label: this.i18nextPipe.transform(
              this.modulePath + ':header.provision'
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.serie_number`
                ),
                isVisible: this.model.serie_number,
                model: this.model.serie_number,
              }),
              new DateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.document_date`
                ),
                isVisible: this.model.document_date,
                model: this.model.document_date,
              }),
              new DateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.expiration_date`
                ),
                isVisible: this.model.expiration_date,
                model: this.model.expiration_date,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.provision_type_description`
                ),
                isVisible: this.model.provision_type_description,
                model: this.model.provision_type_description,
                internalUrl: `/curia-provision-types/${this.model.provision_type_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.place_description`
                ),
                isVisible: this.model.place_description,
                model: this.model.place_description,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.emolument_description`
                ),
                isVisible: this.model.emolument_description,
                model: this.model.emolument_description,
                internalUrl: `/emoluments/${this.model.emolument_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.tax`
                ),
                isVisible: this.model.tax,
                model: this.model.tax,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.document_entity_description`
                ),
                isVisible: this.model.document_entity_description,
                model: this.model.document_entity_description,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.applicant_entity_description`
                ),
                isVisible: this.model.applicant_entity_description,
                model: this.model.applicant_entity_description,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.applicant_function_description`
                ),
                isVisible: this.model.applicant_function_description,
                model: this.model.applicant_function_description,
                internalUrl: `/curia-functions/${this.model.applicant_function_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.applicant_chapelry_description`
                ),
                isVisible: this.model.applicant_chapelry_description,
                model: this.model.applicant_chapelry_description,
                internalUrl: `/chapelries/${this.model.applicant_chapelry_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.archpriest_description`
                ),
                isVisible: this.model.archpriest_description,
                model: this.model.archpriest_description,
                internalUrl: `/priests/${this.model.archpriest_entity_priest_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.subscriber1_description`
                ),
                isVisible: this.model.subscriber1_description,
                model: this.model.subscriber1_description,
                internalUrl: `/priests/${this.model.subscriber1_entity_priest_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.subscriber2_description`
                ),
                isVisible: this.model.subscriber2_description,
                model: this.model.subscriber2_description,
                internalUrl: `/priests/${this.model.subscriber2_entity_priest_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.observations`
                ),
                isVisible: this.model.observations,
                model: this.model.observations,
              }),
            ],
          }),
        ],
      }),
      new Tab({
        name: 'members',
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.members`
        ),
        fields: [
          new Section({
            id: 'members',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.members`
            ),
            isVisible: this.model.curia_provision_members.length,
            fields: [
              new TableField({
                dataSource: this.dataSourceMembers,
                dataSourceColumns: this.dataSourceColumnsMembers,
              }),
            ],
          }),
        ],
      }),
      new Tab({
        name: 'attachments',
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments_tab`
        ),
        fields: [
          new Section({
            id: 'attachments',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.attachments`
            ),
            fields: [
              new TableField({
                dataSource: this.dataSourceAttachments,
                dataSourceColumns: this.dataSourceColumnsAttachments,
              }),
            ],
          }),
        ],
      }),
    ];
  }

  openAttachmentLink(data: any) {
    window.open(
      `${environment.railsAppUrl}/filemanagers/download?f=${data.attachment}&fn=${data.attachment_name}`,
      '_blank'
    );
  }

  addTreasuryDocsOptions() {
    if (this.model) {
      if (!this.model.receipt_id) {
        this.treasuryDocOptionsMenu = [
          {
            icon: 'note_add',
            name: this.i18nextPipe.transform(
              'documents:action.treasury_doc.generate_doc'
            ),
            value: 'generate_doc',
          },
        ];
      } else {
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
    }
  }

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/curia_provisions/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
