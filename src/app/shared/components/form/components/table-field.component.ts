import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormArray, FormBuilder } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import * as _ from 'lodash';
import { NgTemplateNameDirective } from '../../ng-template-name.directive';
import { Subject } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'kyr-table-field',
  templateUrl: './table-field.component.html',
})
export class TableFieldComponent {
  @Input() dataSource: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  @Input() formArray: FormArray = new FormArray([]);
  @Input() newObject: any;
  @Input() dataSourceColumns: any[] = [];

  constructor(
    private fb: FormBuilder,
    private i18nextPipe: I18NextPipe) {}

    
  addTableLine() {
    this.formArray.push(this.fb.group(this.newObject));
    this.dataSource.data = this.formArray.value;
  }

  deleteTableLine(index: number) {
    // this.formArray[index]['_destroy'] = true;
    // const newArray = this.formArray
    // this.formArray.removeAt(index);
    const currentLines = [...this.formArray.value];

    if (currentLines[index].id) {
      currentLines[index] = {
        ...currentLines[index],
        _destroy: true,
      };
    } else {
      currentLines.splice(index, 1);
    }

    this.formArray.clear();
    currentLines.forEach((line) => {
      this.formArray.push(this.fb.group(line));
    });

    this.dataSource.data = this.formArray.value;
  }

  addTemplatesToColumns(templates: any) {
    let mycolumns: any[] = [
      {
        id: 'delete-btn',
        sortable: false,
        template: templates[0]//this.deleteLineTemplate,
      }
    ].concat(this.dataSourceColumns);
    for (const column of mycolumns) {
      column.title = this.i18nextPipe.transform(column.title);
      if (!('template' in column) && 'type' in column) {
        switch (column.type) {
          case 'date':
            column.template = templates[2];//this.dateLineTemplate;
            break;
          case 'input-select':
            column.template = templates[3];//this.inputSelectLineTemplate;
            break;
        
          default:
            column.template = templates[1];//this.inputLineTemplate;
            break;
        }
      }
    }
    return mycolumns;
  }
}