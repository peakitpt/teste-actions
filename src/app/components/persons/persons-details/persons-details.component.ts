import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

import { EntityPerson } from '../person.model';
import * as actions from '../reducers/persons.actions';
import { getPerson } from '../reducers/persons.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-persons-details',
  templateUrl: './persons-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PersonsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<EntityPerson>;
  model: EntityPerson;
  returnUrl = '/persons';
  modulePath = 'persons';
  tableColumns: any[] = [];
  viewName = 'Parishioner';

  selectorGetModel = getPerson;
  actionRequestFail = actions.PersonsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;

  @ViewChild('personalDataTabTemplate')
  personalDataTabTemplate: TemplateRef<any>;
  @ViewChild('categoriesTabTemplate') categoriesTabTemplate: TemplateRef<any>;
  @ViewChild('curiaTabTemplate') curiaTabTemplate: TemplateRef<any>;
  @ViewChild('christianLifeTabTemplate')
  christianLifeTabTemplate: TemplateRef<any>;
  @ViewChild('professionalLifeTabTemplate')
  professionalLifeTabTemplate: TemplateRef<any>;
  @ViewChild('catechistTabTemplate') catechistTabTemplate: TemplateRef<any>;
  @ViewChild('mecTabTemplate') mecTabTemplate: TemplateRef<any>;
  @ViewChild('elderSickTabTemplate') elderSickTabTemplate: TemplateRef<any>;
  @ViewChild('groupsTabTemplate') groupsTabTemplate: TemplateRef<any>;

  afterGetModel() {
    super.afterGetModel();
    this.addTabs();
  }

  private addTabs() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.personal_data`
        ),
        templateContent: this.personalDataTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.categories`
        ),
        templateContent: this.categoriesTabTemplate,
      },
    ];

    if (
      this.sharedModule.isDiocese() &&
      this.model.entity_person_appointments.length
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.curia`),
        templateContent: this.curiaTabTemplate,
      });
    }

    this.detailsTabs.push({
      textLabel: this.i18nextPipe.transform(
        `${this.modulePath}:tabs.christian_life`
      ),
      templateContent: this.christianLifeTabTemplate,
    });

    if (
      this.model.professional_profession_description ||
      this.model.professional_post ||
      this.model.professional_company ||
      this.model.professional_address ||
      this.model.professional_door_number ||
      this.model.professional_postal_code ||
      this.model.professional_locality ||
      this.model.professional_parish ||
      this.model.professional_county ||
      this.model.professional_district ||
      this.model.professional_country_description ||
      this.model.professional_email ||
      this.model.professional_mobilephone ||
      this.model.professional_phone ||
      this.model.professional_fax ||
      this.model.professional_url
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.professional_life`
        ),
        templateContent: this.professionalLifeTabTemplate,
      });
    }

    if (
      this.model.entity &&
      this.model.entity.entity_catechist.catechist &&
      (this.model.entity.entity_catechist.initiation_course_date ||
        this.model.entity.entity_catechist.initiation_course_avaliation ||
        this.model.entity.entity_catechist.general_course_date ||
        this.model.entity.entity_catechist.general_course_avaliation ||
        this.model.entity.entity_catechist.complementary_course_date ||
        this.model.entity.entity_catechist.complementary_course_avaliation)
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.catechist`
        ),
        templateContent: this.catechistTabTemplate,
      });
    }

    if (
      this.model.entity &&
      this.model.entity.entity_mec.mec &&
      (this.model.entity.entity_mec.mec_number ||
        this.model.entity.entity_mec.magnetic_number ||
        this.model.entity.entity_mec.institution_date ||
        this.model.entity.entity_mec
          .institution_center_worshipplace_description ||
        this.model.entity.entity_mec.entities_mecs_lines.length)
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.mec`),
        templateContent: this.mecTabTemplate,
      });
    }

    if (
      this.model.entity &&
      (this.model.entity.entity_elder_patient.elder ||
        this.model.entity.entity_elder_patient.sick) &&
      (this.model.entity.entity_elder_patient.sunday_communion ||
        this.model.entity.entity_elder_patient
          .sunday_communion_minister_description ||
        this.model.entity.entity_elder_patient.anointing_ofthe_sick_date ||
        this.model.entity.entity_elder_patient.anointing_ofthe_sick_locale)
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.elder_sick`
        ),
        templateContent: this.elderSickTabTemplate,
      });
    }

    if (this.model.entity && this.model.entity.newsletter_subscriptor) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.groups`),
        templateContent: this.groupsTabTemplate,
      });
    }
  }

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/parishioners/${this.model.entity_id}/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
