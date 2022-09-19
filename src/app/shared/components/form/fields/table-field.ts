import { ChangeDetectorRef, QueryList } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import * as _ from 'lodash';
import { NgTemplateNameDirective } from '../../ng-template-name.directive';


export class TableField {
  protected type: string = 'table';
  dataSource: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumns: any[] = [];
  fb: FormBuilder;
  formArray: FormArray = new FormArray([]);
  newObject: any;
  protected tabTemplates: QueryList<NgTemplateNameDirective>;

  public constructor(init?:Partial<TableField>) {
    Object.assign(this, init);
  }

  addTableLine() {
    this.formArray.push(this.fb.group(this.newObject));
    this.dataSource.data = this.formArray.value;
  }

  deleteTableLine(index: number) {
    this.formArray.removeAt(index);
    this.dataSource.data = this.formArray.value;
  }

  getTableTemplates(templates: any, columns: any[]) {
    let mycolumns: any[] = [
      {
        id: 'delete-btn',
        sortable: false,
        template: templates['delete'],
      }
    ].concat(columns);
    for (const column of mycolumns) {
      if (!('template' in column) && 'type' in column) {
        switch (column.type) {
          case 'date':
            column.template = templates['date'];
            break;
          case 'input-select':
            column.template = templates['input_select'];
            break;
        
          default:
            column.template = templates['input'];
            break;
        }
      }
    }
    return mycolumns;
  }
}