import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/curia-economic-councils.actions';
import { getCuriaEconomicCouncil } from '../reducers/curia-economic-councils.selectors';
import { Observable } from 'rxjs';
import { CuriaEconomicCouncil } from '../curia-economic-council.model';
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
  selector: 'kyr-curia-economic-councils-details',
  templateUrl: './curia-economic-councils-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaEconomicCouncilsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CuriaEconomicCouncil>;
  returnUrl = '/curia-economic-councils';
  modulePath = 'curia-economic-councils';
  viewName = 'CuriaEconomicCouncil';

  detailsFields: Tab[] = [];
  @ViewChild('freeDescriptionTemplate')
  freeDescriptionTemplate: TemplateRef<any>;
  dataSourceAttachments: TableDataSource<any> = new TableDataSource([]);
  dataSourceColumnsAttachments: any[] = [];
  @ViewChild('attachmentLinkTemplate') attachmentLinkTemplate: TemplateRef<any>;
  @ViewChild('curia_function_descriptionLinkTemplate')
  curia_function_descriptionLinkTemplate: TemplateRef<any>;
  dataSourceAppointments: TableDataSource<any> = new TableDataSource([]);
  dataSourceColumnsAppointments: any[] = [];

  selectorGetModel = getCuriaEconomicCouncil;
  actionRequestFail =
    actions.CuriaEconomicCouncilsActionTypes.RequestFailCuriaEconomicCouncils;
  actionRequestGetOne = actions.RequestGetCuriaEconomicCouncil;
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
  }

  buildDataSources() {
    this.dataSourceAttachments.data =
      this.model.curia_economic_council_attachments;
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

    this.dataSourceAppointments.data =
      this.model.curia_economic_council_appointments;
    this.dataSourceColumnsAppointments = [
      {
        id: 'curia_function_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.curia_function_description`
        ),
        template: this.curia_function_descriptionLinkTemplate,
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
      },
    ];
  }

  buildFields() {
    this.detailsFields = [
      new Tab({
        name: 'economic_council',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':header.economic_council'
        ),
        fields: [
          new Section({
            id: 'economic_council',
            label: this.i18nextPipe.transform(
              this.modulePath + ':header.economic_council'
            ),
            fields: [
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.active`
                ),
                model: this.model.active,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
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
                  `${this.modulePath}:model.chapelry_description`
                ),
                isVisible: this.model.chapelry_description,
                model: this.model.chapelry_description,
                internalUrl: `/chapelries/${this.model.chapelry_id}/details`,
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
                  `${this.modulePath}:model.archpriest_description`
                ),
                isVisible: this.model.archpriest_description,
                model: this.model.archpriest_description,
                internalUrl: `/priests/${this.model.archpriest_entity_priest_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.president_description`
                ),
                isVisible: this.model.president_description,
                model: this.model.president_description,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.vice_president_description`
                ),
                isVisible: this.model.vice_president_description,
                model: this.model.vice_president_description,
              }),
            ],
          }),
          new Section({
            id: 'members',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.members`
            ),
            isVisible:
              this.model.curia_economic_council_appointments.length ||
              this.model.subscriber1_description ||
              this.model.subscriber2_description,
            fields: [
              new TableField({
                dataSource: this.dataSourceAppointments,
                dataSourceColumns: this.dataSourceColumnsAppointments,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.subscriber1_description`
                ),
                isVisible: this.model.subscriber1_description,
                model: this.model.subscriber1_description,
                // internalUrl: `/priests/${this.model.subscriber1_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.subscriber2_description`
                ),
                isVisible: this.model.subscriber2_description,
                model: this.model.subscriber2_description,
                // internalUrl: `/priests/${this.model.subscriber2_id}/details`,
              }),
            ],
          }),
        ],
      }),
      new Tab({
        name: 'documents',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.documents'
        ),
        fields: [
          new Section({
            id: 'documents',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.documents`
            ),
            isVisible: this.model.is_free_text,
            fields: [
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.is_free_text`
                ),
                model: this.model.is_free_text,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new TemplateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.free_text`
                ),
                template: this.freeDescriptionTemplate,
                model: this.model,
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
    const url = `${environment.railsAppUrl}/curia_economic_councils/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
