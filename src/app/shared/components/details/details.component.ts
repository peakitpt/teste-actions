import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateNameDirective } from '../ng-template-name.directive';
import { Tab } from './fields/tab-field';

@Component({
  selector: 'kyr-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements AfterViewInit, OnInit {
  @Input() fields: Tab[] = [];

  detailsTabs: any[] = [];

  @ViewChildren(NgTemplateNameDirective) tabTemplates: QueryList<NgTemplateNameDirective>;
  
  ngOnInit() {
  }

  ngAfterViewInit() {
    let index=0;
    for (const field of this.fields) {
      if (field.type === 'tab') {
        this.addTab(field);
      }
      index++;
      
    }
  }

  public addTab(field: any) {
    this.detailsTabs.push({
      textLabel: field.textLabel,
      templateContent: this.getTemplateRefByName('tab-' + field.name)
    });
  }

  getTemplateRefByName(name: string): TemplateRef<any> {
    const dir = this.tabTemplates.find(dir => dir.name === name);
    return dir ? dir.template : null
  }

  replaceNewLines(text: string) {
    return text.split("\n").join("<br/>");
  }
}