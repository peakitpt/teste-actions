import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/curia-secretariats.actions';
import { getCuriaSecretariat } from '../reducers/curia-secretariats.selectors';
import { Observable } from 'rxjs';
import { CuriaSecretariat } from '../curia-secretariat.model';
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
  selector: 'kyr-curia-secretariats-details',
  templateUrl: './curia-secretariats-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaSecretariatsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CuriaSecretariat>;
  returnUrl = '/curia-secretariats';
  modulePath = 'curia-secretariats';
  viewName = 'CuriaSecretariat';

  detailsFields: Tab[] = [];
  @ViewChild('freeDescriptionTemplate')
  freeDescriptionTemplate: TemplateRef<any>;
  @ViewChild('freeTextTemplate') freeTextTemplate: TemplateRef<any>;
  dataSourceAttachments: TableDataSource<any> = new TableDataSource([]);
  dataSourceColumnsAttachments: any[] = [];
  @ViewChild('attachmentLinkTemplate') attachmentLinkTemplate: TemplateRef<any>;
  @ViewChild('curia_function_descriptionLinkTemplate')
  curia_function_descriptionLinkTemplate: TemplateRef<any>;
  dataSourceEntities: TableDataSource<any> = new TableDataSource([]);
  dataSourceColumnsEntities: any[] = [];

  selectorGetModel = getCuriaSecretariat;
  actionRequestFail =
    actions.CuriaSecretariatsActionTypes.RequestFailCuriaSecretariats;
  actionRequestGetOne = actions.RequestGetCuriaSecretariat;
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
    this.dataSourceAttachments.data = this.model.curia_secretariat_attachments;
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
    this.dataSourceEntities.data = this.model.curia_secretariat_entities;
    this.dataSourceColumnsEntities = [
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
      },
      {
        id: 'curia_function_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.curia_function_description`
        ),
        template: this.curia_function_descriptionLinkTemplate,
      },
      {
        id: 'place_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.place_description`
        ),
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
        name: 'secretariats',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':header.secretariats'
        ),
        fields: [
          new Section({
            id: 'secretariats',
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
                  `${this.modulePath}:model.curia_secretariat_type_description`
                ),
                isVisible: this.model.curia_secretariat_type_description,
                model: this.model.curia_secretariat_type_description,
                internalUrl: `/curia-secretariat-types/${this.model.curia_secretariat_type_id}/details`,
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
                model: this.model.delivery_term,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.dispatch`
                ),
                model: this.model.dispatch,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.archive`
                ),
                model: this.model.archive,
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
                  `${this.modulePath}:model.subscriber_description`
                ),
                isVisible: this.model.subscriber_description,
                model: this.model.subscriber_description,
                internalUrl: `/priests/${this.model.subscriber_entity_priest_id}/details`,
              }),
            ],
          }),
          new Section({
            id: 'entities',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.entities`
            ),
            fields: [
              new TableField({
                dataSource: this.dataSourceEntities,
                dataSourceColumns: this.dataSourceColumnsEntities,
              }),
              new TemplateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.free_description`
                ),
                template: this.freeDescriptionTemplate,
                // isVisible: this.model.free_description,
                model: this.model,
              }),
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
                template: this.freeTextTemplate,
                isVisible: this.model.is_free_text,
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
    const url = `${environment.railsAppUrl}/curia_secretariats/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
