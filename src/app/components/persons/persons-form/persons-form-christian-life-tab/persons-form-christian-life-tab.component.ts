import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-persons-form-christian-life-tab',
  templateUrl: './persons-form-christian-life-tab.component.html',
  styleUrls: ['./persons-form-christian-life-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonsFormChristianLifeTabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() todayDate: Date;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;

  oftenEucharistOptions: Array<{ label: string; value: string }> = [];
  catechismYearsOptions: Array<{ label: string; value: number }> = [];
  livesWithOptions: Array<{ label: string; value: string }> = [];

  constructor(public sharedModule: SharedModule) {}

  ngOnInit() {
    this.oftenEucharistOptions = this.sharedModule.getOftenEucharists();
    this.catechismYearsOptions = this.sharedModule.getCatechismYears();
    this.livesWithOptions = this.sharedModule.getLivesWith();
  }
}
