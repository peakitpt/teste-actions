import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/catholic-directory-institutions.actions';
import { getCatholicDirectoryInstitution } from '../reducers/catholic-directory-institutions.selectors';
import { Observable } from 'rxjs';
import { CatholicDirectoryInstitution } from '../catholic-directory-institution.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { Tab } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-catholic-directory-institutions-details',
  templateUrl: './catholic-directory-institutions-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatholicDirectoryInstitutionsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CatholicDirectoryInstitution>;
  returnUrl = '/catholic-directory-institutions';
  modulePath = 'catholic-directory-institutions';
  viewName = 'CatholicDirectoryInstitution';

  selectorGetModel = getCatholicDirectoryInstitution;
  actionRequestFail =
    actions.CatholicDirectoryInstitutionsActionTypes
      .RequestFailCatholicDirectoryInstitutions;
  actionRequestGetOne = actions.RequestGetCatholicDirectoryInstitution;

  tabs: Tab[] = [];
  institutionsGenders: any;
  @ViewChild('institutionTabTemplate') institutionTabTemplate: TemplateRef<any>;
  @ViewChild('appointmentsTabTemplate')
  appointmentsTabTemplate: TemplateRef<any>;

  ngAfterViewInit() {
    this.setTabs();
    this.setInstitutionsGenders();
    super.ngAfterViewInit();
  }

  setTabs() {
    this.tabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.institution'
        ),
        templateContent: this.institutionTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.appointments'
        ),
        templateContent: this.appointmentsTabTemplate,
      },
    ];
  }

  setInstitutionsGenders() {
    this.institutionsGenders = {
      m: this.i18nextPipe.transform(this.modulePath + ':option.male'),
      f: this.i18nextPipe.transform(this.modulePath + ':option.female'),
      u: this.i18nextPipe.transform(
        this.modulePath + ':option.undifferentiated'
      ),
    };
  }
}
