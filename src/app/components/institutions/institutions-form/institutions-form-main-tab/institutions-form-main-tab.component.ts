import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';
import { EntityInstitutionValences } from '../../institution.model';

@Component({
  selector: 'kyr-institutions-form-main-tab',
  templateUrl: './institutions-form-main-tab.component.html',
})
export class InstitutionsFormMainTabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() institutionTypeDescriptionRightTemplate: TemplateRef<any>;
  @Input() secularInstituteRightTemplate: TemplateRef<any>;
  @Input() congregationRightTemplate: TemplateRef<any>;
  @Input() archpristshipRightTemplate: TemplateRef<any>;
  @Input() chapelryRightTemplate: TemplateRef<any>;
  @Input() countryRightTemplate: TemplateRef<any>;

  @Input() valencesFormArray: FormArray;
  @Input() valencesDS: TableDataSource<any>;
  @Input() valencesColumns: any[];

  imageChanged: any;
  currentImagePath = {
    cover: null,
    attachment_filename: null,
    thumbnail: null,
  };
  environment = environment;
  baseFilePath = environment.railsAppUrl;

  websiteTypeOptions: any[];
  institutionGenderOptions: any[];
  christianLifeCentersTypeOptions: any[];
  periodicityOptions: any[];
  socialMediaOptions: any[];

  newValence: EntityInstitutionValences = {
    created_at: null,
    entity_institution_id: null,
    id: null,
    updated_at: null,
    valence_description: null,
    valence_id: null,
  };

  constructor(public i18nextPipe: I18NextPipe, public fb: FormBuilder) {}

  ngOnInit() {
    this.populateWebsiteTypeOptions();
    this.populateInstitutionGender();
    this.populateChristianLifeCentersTypeOptions();
    this.populatePeriodicityOptions();
    this.populateSocialMediaInstitutionTypes();
  }

  populateWebsiteTypeOptions() {
    this.websiteTypeOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.website.shrines`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.website.chapels`
        ),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.website.chaplaincies`
        ),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.website.christian_life_centers`
        ),
        value: 4,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.website.rectories`
        ),
        value: 5,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.website.ipss`
        ),
        value: 6,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.website.charity`
        ),
        value: 7,
      },
    ];
  }

  populateInstitutionGender() {
    this.institutionGenderOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.gender.male`
        ),
        value: 'm',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.gender.female`
        ),
        value: 'f',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.gender.undefined`
        ),
        value: 'u',
      },
    ];
  }

  populateChristianLifeCentersTypeOptions() {
    this.christianLifeCentersTypeOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.christian_life_centers.sanctuary`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.christian_life_centers.rectors_chaplaincies`
        ),
        value: 2,
      },
    ];
  }

  populatePeriodicityOptions() {
    this.periodicityOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.periodicity.quarterly`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.periodicity.weekly`
        ),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.periodicity.biweekly`
        ),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.periodicity.four-monthly`
        ),
        value: 4,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.periodicity.monthly`
        ),
        value: 5,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.periodicity.daily`
        ),
        value: 6,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.periodicity.bimonthly`
        ),
        value: 7,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.periodicity.yearly`
        ),
        value: 8,
      },
    ];
  }

  populateSocialMediaInstitutionTypes() {
    this.socialMediaOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.social_media.report_card`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.social_media.typography`
        ),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.social_media.magazine`
        ),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.social_media.radio`
        ),
        value: 4,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.social_media.bookstore`
        ),
        value: 5,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.social_media.journal`
        ),
        value: 6,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.social_media.publishing_company`
        ),
        value: 7,
      },
    ];
  }

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }

  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentImagePath.attachment_filename = event.target.files[0].name;
        this.currentImagePath.thumbnail = eventReader.target.result;

        this.imageChanged = event;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
