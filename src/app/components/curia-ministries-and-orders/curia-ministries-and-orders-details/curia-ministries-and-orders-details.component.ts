import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/curia-ministries-and-orders.actions';
import { getCuriaMinistryAndOrder } from '../reducers/curia-ministries-and-orders.selectors';
import { Observable } from 'rxjs';
import { CuriaMinistryAndOrder } from '../curia-ministry-and-order.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { Tab } from 'src/app/shared/components/details/fields/tab-field';
import { Section } from 'src/app/shared/components/details/fields/section-field';
import { TableField } from 'src/app/shared/components/details/fields/table-field';
import { TextField } from 'src/app/shared/components/details/fields/text-field';
import { DateField } from 'src/app/shared/components/details/fields/date-field';
import { TableDataSource } from '@peakitpt/ui-material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-curia-ministries-and-orders-details',
  templateUrl: './curia-ministries-and-orders-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaMinistriesAndOrdersDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CuriaMinistryAndOrder>;
  returnUrl = '/curia-ministries-and-orders';
  modulePath = 'curia-ministries-and-orders';
  viewName = 'CuriaMinistryAndOrder';

  detailsFields: Tab[] = [];
  dataSourceAttachments: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsAttachments: any[] = [];
  @ViewChild('attachmentLinkTemplate') attachmentLinkTemplate: TemplateRef<any>;

  selectorGetModel = getCuriaMinistryAndOrder;
  actionRequestFail =
    actions.CuriaMinistriesAndOrdersActionTypes
      .RequestFailCuriaMinistriesAndOrders;
  actionRequestGetOne = actions.RequestGetCuriaMinistryAndOrder;
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
      this.model.curia_ministries_and_order_attachments;
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
        name: 'ministries_and_orders',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':header.ministries_and_orders'
        ),
        fields: [
          new Section({
            id: 'ministries_and_orders',
            label: '',
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
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.entity_description`
                ),
                isVisible: this.model.entity_description,
                model: this.model.entity_description,
                internalUrl: `/priests/${this.model.entity_priest_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.type_id`
                ),
                isVisible: this.model.type_id,
                model: this.i18nextPipe.transform(
                  `${this.modulePath}:model.options.type.${this.model.type_id}`
                ),
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.function_description`
                ),
                isVisible: this.model.function_description,
                model: this.model.function_description,
                internalUrl: `/curia-functions/${this.model.function_id}/details`,
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
                  `${this.modulePath}:model.place_description`
                ),
                isVisible: this.model.place_description,
                model: this.model.place_description,
                internalUrl: `/worshipplaces/${this.model.place_id}/details`,
              }),
              new DateField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.date`
                ),
                isVisible: this.model.date,
                model: this.model.date,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.hours`
                ),
                isVisible: this.model.hours,
                model: this.model.hours,
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
            isVisible:
              this.model.curia_ministries_and_order_attachments.length > 0,
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

  getSubscriptionReports() {
    super.getSubscriptionReports('CuriaMinistriesAndOrder');
  }

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/curia_ministries_and_orders/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
