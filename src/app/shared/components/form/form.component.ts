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
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { NgTemplateNameDirective } from '../ng-template-name.directive';
import { TabField } from './fields/tab-field';

@Component({
  selector: 'kyr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent {
  @Input() fields: any[] = [];
  @Input() formField: any;
}