import {
  Component,
  Input,
  AfterViewInit,
  ViewChildren,
  QueryList,
  TemplateRef,
  AfterContentInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgTemplateNameDirective } from '../../ng-template-name.directive';
import { TabField } from '../fields/tab-field';

@Component({
  selector: 'kyr-tab-group-field',
  templateUrl: './tab-group-field.component.html',
})
export class TabGroupFieldComponent implements AfterViewInit, AfterContentInit {
  @Input() fields: any[];

  @ViewChildren(NgTemplateNameDirective) tabTemplates: QueryList<NgTemplateNameDirective>;

  tabs: { textLabel: string, templateContent: TemplateRef<any> }[] = [];

  ngAfterViewInit() {
  	
  }

  ngAfterContentInit() {
    // this.buildTabs(this.fields);
  }

  buildTabs(fields: any[]) {
    for (const field of fields) {
      const tabField: TabField = field;
      this.tabs.push({
        textLabel: tabField.textLabel,
        templateContent: this.getTemplateRefByName('tab-' + tabField.name)
      });
    }
  }

  getTemplateRefByName(name: string): TemplateRef<any> {
    console.log("this.tabTemplates", this.tabTemplates);
    const dir = this.tabTemplates.find(dir => dir.name === name);
    return dir ? dir.template : null
  }

  getTabs() {
    return () => {
      this.buildTabs(this.fields);
      return this.tabs;
    };
    // return this.tabs;
  }
}