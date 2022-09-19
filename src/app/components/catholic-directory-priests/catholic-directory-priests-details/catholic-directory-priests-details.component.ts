import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/catholic-directory-priests.actions';
import { getCatholicDirectoryPriest } from '../reducers/catholic-directory-priests.selectors';
import { Observable } from 'rxjs';
import { CatholicDirectoryPriest } from '../catholic-directory-priest.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { Tab } from '@peakitpt/ui-material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-catholic-directory-priests-details',
  templateUrl: './catholic-directory-priests-details.component.html',
  styleUrls: ['./catholic-directory-priests-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatholicDirectoryPriestsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CatholicDirectoryPriest>;
  returnUrl = '/catholic-directory-priests';
  modulePath = 'catholic-directory-priests';
  viewName = 'CatholicDirectoryPriest';

  selectorGetModel = getCatholicDirectoryPriest;
  actionRequestFail =
    actions.CatholicDirectoryPriestsActionTypes
      .RequestFailCatholicDirectoryPriests;
  actionRequestGetOne = actions.RequestGetCatholicDirectoryPriest;

  baseFilePath = environment.railsAppUrl;
  tabs: Tab[] = [];
  @ViewChild('personalDataTabTemplate')
  personalDataTabTemplate: TemplateRef<any>;
  @ViewChild('ordenationsAppointmentsTabTemplate')
  ordenationsAppointmentsTabTemplate: TemplateRef<any>;
  @ViewChild('otherInfoTabTemplate')
  otherInfoTabTemplate: TemplateRef<any>;

  residenceTypes: any;
  documentTypes: any;

  ngAfterViewInit() {
    this.setTabs();
    this.setOptions();
    super.ngAfterViewInit();
  }

  setTabs() {
    this.tabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.personal_data'
        ),
        templateContent: this.personalDataTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.ordenations_appointments'
        ),
        templateContent: this.ordenationsAppointmentsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.other_info_tab'
        ),
        templateContent: this.otherInfoTabTemplate,
      },
    ];
  }

  setOptions() {
    this.residenceTypes = {
      1: this.i18nextPipe.transform(`${this.modulePath}:option.religious`),
      2: this.i18nextPipe.transform(`${this.modulePath}:option.archdiocesan`),
      3: this.i18nextPipe.transform(
        `${this.modulePath}:option.archdiocesan_residing_outside`
      ),
      4: this.i18nextPipe.transform(
        `${this.modulePath}:option.from_outside_residing_at_archdiocese`
      ),
    };

    this.documentTypes = {
      1: this.i18nextPipe.transform(`${this.modulePath}:option.identity_card`),
      2: this.i18nextPipe.transform(`${this.modulePath}:option.citizen_card`),
      3: this.i18nextPipe.transform(`${this.modulePath}:option.passport`),
      4: this.i18nextPipe.transform(
        `${this.modulePath}:option.residence_title`
      ),
    };
  }
}
