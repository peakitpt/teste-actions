import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/curia-administrative-processes.actions';
import { getCuriaAdministrativeProcess } from '../reducers/curia-administrative-processes.selectors';
import { Observable } from 'rxjs';
import { CuriaAdministrativeProcess } from '../curia-administrative-process.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { Tab } from 'src/app/shared/components/details/fields/tab-field';
import { Section } from 'src/app/shared/components/details/fields/section-field';
import { TableField } from 'src/app/shared/components/details/fields/table-field';
import { TextField } from 'src/app/shared/components/details/fields/text-field';
import { DateField } from 'src/app/shared/components/details/fields/date-field';
import { TableDataSource } from '@peakitpt/ui-material';
import { environment } from 'src/environments/environment';

import { IconField } from 'src/app/shared/components/details/fields/icon-field';
import { TemplateField } from 'src/app/shared/components/details/fields/template-field';

@Component({
  selector: 'kyr-curia-administrative-processes-details',
  templateUrl: './curia-administrative-processes-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaAdministrativeProcessesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CuriaAdministrativeProcess>;
  returnUrl = '/curia-administrative-processes';
  modulePath = 'curia-administrative-processes';
  viewName = 'CuriaAdministrativeProcess';

  detailsFields: Tab[] = [];
  @ViewChild('freeTextTemplate') freeTextTemplate: TemplateRef<any>;
  @ViewChild('partyProvisionScheduleTemplate')
  partyProvisionScheduleTemplate: TemplateRef<any>;
  @ViewChild('partyProvisionBandsOfTemplate')
  partyProvisionBandsOfTemplate: TemplateRef<any>;
  dataSourceAttachments: TableDataSource<any> = new TableDataSource([]);
  dataSourceColumnsAttachments: any[] = [];
  @ViewChild('attachmentLinkTemplate') attachmentLinkTemplate: TemplateRef<any>;

  selectorGetModel = getCuriaAdministrativeProcess;
  actionRequestFail =
    actions.CuriaAdministrativeProcessesActionTypes
      .RequestFailCuriaAdministrativeProcesses;
  actionRequestGetOne = actions.RequestGetCuriaAdministrativeProcess;
  actionClearGet = actions.ClearGet;

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
    this.buildHeaderOptionsMenu();
  }

  buildDataSources() {
    this.dataSourceAttachments.data =
      this.model.curia_administrative_process_attachments;
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
  }

  buildFields() {
    this.detailsFields = [
      new Tab({
        name: 'administrative-processes',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':header.administrative_processes'
        ),
        fields: [
          new Section({
            id: 'administrative-processes',
            label: '',
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.serie_number`
                ),
                isVisible: this.model.serie_number,
                model: this.model.serie_number,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.curia_administrative_process_type_description`
                ),
                isVisible:
                  this.model.curia_administrative_process_type_description,
                model: this.model.curia_administrative_process_type_description,
                internalUrl: `/curia-administrative-process-types/${this.model.curia_administrative_process_type_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.title`
                ),
                isVisible: this.model.title,
                model: this.model.title,
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
            ],
          }),
          new Section({
            id: 'other-data',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.other_data`
            ),
            isVisible:
              this.model.delivery_term ||
              this.model.dispatch ||
              this.model.archive,
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.delivery_term`
                ),
                isVisible: this.model.delivery_term,
                model: this.model.delivery_term,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.dispatch`
                ),
                isVisible: this.model.dispatch,
                model: this.model.dispatch,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.archive`
                ),
                isVisible: this.model.archive,
                model: this.model.archive,
              }),
            ],
          }),
        ],
      }),
      new Tab({
        name: 'documents',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':header.documents'
        ),
        fields: [
          new Section({
            id: 'entities',
            label: '',
            fields: [
              new DateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.document_date`
                ),
                isVisible: this.model.document_date,
                model: this.model.document_date,
              }),
            ],
          }),
          new Section({
            id: 'requirements',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.requirements`
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.subscriber_description`
                ),
                isVisible: this.model.subscriber_description,
                model: this.model.subscriber_description,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.entity_description`
                ),
                isVisible: this.model.entity_description,
                model: this.model.entity_description,
                internalUrl: `/persons/${this.model.entity_id}/details`,
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
                  `${this.modulePath}:model.free_description`
                ),
                isVisible: this.model.free_description,
                model: this.model.free_description,
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.is_free_text`
                ),
                model: this.model.is_free_text,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
                isVisible: this.model.is_free_text,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.free_text_title`
                ),
                isVisible: this.model.is_free_text,
                model: this.model.free_text_title,
              }),
              new TemplateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.free_text`
                ),
                template: this.freeTextTemplate,
                model: this.model,
              }),
            ],
          }),
        ],
      }),
      new Tab({
        name: 'party_provisions',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.party_provisions'
        ),
        isVisible:
          this.model && this.model.curia_administrative_process_type.subtype_id,
        fields: [
          new Section({
            id: 'entities',
            label: '',
            fields: [
              new DateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.document_date`
                ),
                isVisible: this.model.document_date,
                model: this.model.document_date,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.party_provision_chapelry_description`
                ),
                isVisible: this.model.party_provision_chapelry_description,
                model: this.model.party_provision_chapelry_description,
                internalUrl: `/chapelries/${this.model.party_provision_chapelry_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.party_provision_dates`
                ),
                isVisible: this.model.party_provision_dates,
                model: this.model.party_provision_dates,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.party_provision_place`
                ),
                isVisible: this.model.party_provision_place,
                model: this.model.party_provision_place,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.party_provision_preacher_description`
                ),
                isVisible: this.model.party_provision_preacher_description,
                model: this.model.party_provision_preacher_description,
                internalUrl: `/priests/${this.model.party_provision_preacher_id}/details`,
              }),
              new TemplateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.party_provision_schedule`
                ),
                template: this.partyProvisionScheduleTemplate,
                model: this.model,
              }),
              new TemplateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.party_provision_bands_of`
                ),
                template: this.partyProvisionBandsOfTemplate,
                model: this.model,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.party_provision_subscriber_description`
                ),
                isVisible: this.model.party_provision_subscriber_description,
                model: this.model.party_provision_subscriber_description,
                internalUrl: `/priests/${this.model.party_provision_subscriber_id}/details`,
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
      `${environment.railsAppUrl}/filemanagers/download?f=${data.attachment}&fn=${data.attachment_filename}`,
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
    const url = `${environment.railsAppUrl}/curia_administrative_processes/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
