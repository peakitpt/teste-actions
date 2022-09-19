import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { Subscription } from 'rxjs';
import { State } from '../../reducers/deaths.reducer';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'kyr-deaths-form-main-tab',
  templateUrl: './deaths-form-main-tab.component.html',
})
export class DeathsFormMainTabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() id: number;
  @Input() form: FormGroup;
  @Input() todayDate: Date;
  @Input() subs: Subscription[] = [];

  @Input() leftTemplate: TemplateRef<any>;
  @Input() personsRightTemplate: TemplateRef<any>;
  @Input() chapelriesRightTemplate: TemplateRef<any>;
  @Input() emolumentsRightTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;

  buryProcessOptions: Array<{ label: string; value: number }> = [];
  civilStatusesOptions: Array<{ label: string; value: string }> = [];

  constructor(
    public store: Store<State>,
    public sharedModule: SharedModule,
    public i18nextPipe: I18NextPipe
  ) {}

  ngOnInit() {
    this.buryProcessOptions = [
      {
        label: '----',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:bury_process_options.buried`
        ),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:bury_process_options.cremated`
        ),
        value: 1,
      },
    ];

    this.sharedModule
      .getCivilStatuses()
      .forEach((cs: { label: string; value: number }) => {
        this.civilStatusesOptions.push({
          label: cs.label,
          value: cs.value ? cs.label : null,
        });
      });
  }
}
