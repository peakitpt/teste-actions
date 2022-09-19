import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpansionPanelItem } from '@peakitpt/ui-material';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';

import { Group, GroupResponse } from '../../groups/group.model';
import { RequestGetEntirely } from 'src/app/components/groups/reducers/groups.actions';
import { getGroupsListEntirely } from 'src/app/components/groups/reducers/groups.selectors';

@Component({
  selector: 'kyr-persons-search',
  templateUrl: './persons-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PersonsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'persons';

  actionRequestPostSearch = RequestPostSearch;

  @ViewChild('personalDataTemplate') personalDataTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('contactsTemplate') contactsTemplate: TemplateRef<any>;
  @ViewChild('addressTemplate') addressTemplate: TemplateRef<any>;
  @ViewChild('othersTemplate') othersTemplate: TemplateRef<any>;

  /* This specific's component fields */
  expansionPanels: ExpansionPanelItem[] = [];
  groupsOptions: Array<{ label: string; value: number }> = [];
  genderOptions: Array<{ label: string; value: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: '',
    },
    {
      label: this.i18nextPipe.transform('translation:gender.male'),
      value: 'true',
    },
    {
      label: this.i18nextPipe.transform('translation:gender.female'),
      value: 'false',
    },
  ];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    private groupsStore: Store<Group>
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();

    this.groupsStore.dispatch(
      new RequestGetEntirely({ page: 0, limit: 'none' })
    );
    this.subs.push(
      this.groupsStore
        .select(getGroupsListEntirely)
        .subscribe((groupsResponse: GroupResponse) => {
          if (groupsResponse && groupsResponse.results) {
            groupsResponse.results.forEach((group: Group) => {
              this.groupsOptions.push({
                label: group.name,
                value: group.id,
              });
            });
          }
        })
    );
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        // MAIN
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.name`
          ),
          value: null,
          mainField: true,
        }),
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          value: null,
        }),
        disabled: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.disabled`
          ),
          value: '',
        }),
        birth_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(`${this.modulePath}:model.birth_date`) +
            ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        birth_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(`${this.modulePath}:model.birth_date`) +
            ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        professional_profession_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.professional_profession_description`
          ),
          value: null,
        }),
        sex: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.sex`
          ),
          value: '',
        }),
        ident_document_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.ident_document_number`
          ),
          value: null,
        }),
        taxpayer: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.taxpayer`
          ),
          value: null,
        }),
        entity_father_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_father_description`
          ),
          value: null,
        }),
        entity_mother_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_mother_description`
          ),
          value: null,
        }),
        entity_spouse_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_spouse_description`
          ),
          value: null,
        }),
        wedding_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.wedding_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        wedding_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.wedding_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        // CATEGORIES
        is_parishioner: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.is_parishioner`
          ),
          value: '',
        }),
        catechist: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.entity_catechist.catechist`
          ),
          value: '',
        }),
        is_catechized: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.is_catechized`
          ),
          value: '',
        }),
        mec: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.entity_mec.mec`
          ),
          value: '',
        }),
        elder: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.entity_elder_patient.elder`
          ),
          value: '',
        }),
        sick: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.entity_elder_patient.sick`
          ),
          value: '',
        }),
        is_acolyte: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.entity_acolyte.is_acolyte`
          ),
          value: '',
        }),
        is_pastoral_agent: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.entity_pastoral_agent.active`
          ),
          value: '',
        }),
        is_reader: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.entity_reader.is_reader`
          ),
          value: '',
        }),
        can_sign_documents: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.can_sign_documents`
          ),
          value: '',
        }),
        newsletter_subscriptor: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.newsletter_subscriptor`
          ),
          value: '',
        }),
        deceased: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.deceased`
          ),
          value: '',
        }),
        // CONTACTS
        mobilephone: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.mobilephone`
          ),
          value: null,
        }),
        phone: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.phone`
          ),
          value: null,
        }),
        email: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.email`
          ),
          value: null,
        }),
        url: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.url`
          ),
          value: null,
        }),
        // ADDRESS
        address: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.address`
          ),
          value: null,
        }),
        door_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.door_number`
          ),
          value: null,
        }),
        postal_code: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.postal_code`
          ),
          value: null,
        }),
        place: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.place`
          ),
          value: null,
        }),
        county: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.county`
          ),
          value: null,
        }),
        country_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.country_description`
          ),
          value: null,
        }),
        // OTHERS
        groups: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:header.groups`
          ),
          value: null,
        }),
        does_birthday_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:filters.does_birthday`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        does_birthday_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:filters.does_birthday`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        does_wedding_birthday_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:filters.does_wedding_birthday`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        does_wedding_birthday_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:filters.does_wedding_birthday`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        does_xx_wedding_birthday: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:filters.does_xx_wedding_birthday`
          ),
          value: null,
        }),
      }),
    });
  }

  afterSideNavLoaded() {
    this.expansionPanels = [
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.personal_data`
        ),
        template: this.personalDataTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:tabs.categories`),
        template: this.categoriesTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.contacts`),
        template: this.contactsTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.address`),
        template: this.addressTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:filters.others`),
        template: this.othersTemplate,
      } as ExpansionPanelItem,
    ];
    this.cdr.detectChanges();
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'birth_date_start':
      case 'birth_date_end':
      case 'wedding_date_start':
      case 'wedding_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'disabled':
      case 'is_parishioner':
      case 'elder':
      case 'sick':
      case 'catechist':
      case 'mec':
      case 'is_catechized':
      case 'can_sign_documents':
      case 'newsletter_subscriptor':
      case 'deceased':
        return `${searchWordLabel}:(${
          this.booleanOptions.find((o) => o.value === value).label
        }) `;
      case 'sex':
        return `${searchWordLabel}:(${
          this.genderOptions.find((o) => o.value === value).label
        }) `;
      case 'groups':
        if (value && value.length) {
          const labels: string[] = [];
          value.forEach((id: number) =>
            labels.push(this.groupsOptions.find((o) => o.value === id).label)
          );
          return `${searchWordLabel}:(${labels.join(', ')}) `;
        }
        return '';
      case 'does_birthday_start':
      case 'does_birthday_end':
      case 'does_wedding_birthday_start':
      case 'does_wedding_birthday_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value,
          this.i18nextPipe.transform('translation:format.date_no_year')
        )}) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'birth_date_start':
      case 'birth_date_end':
      case 'wedding_date_start':
      case 'wedding_date_end':
      case 'does_birthday_start':
      case 'does_birthday_end':
      case 'does_wedding_birthday_start':
      case 'does_wedding_birthday_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      case 'disabled':
      case 'is_parishioner':
      case 'elder':
      case 'sick':
      case 'catechist':
      case 'mec':
      case 'is_catechized':
      case 'can_sign_documents':
      case 'newsletter_subscriptor':
      case 'deceased':
        const booleanOption = this.booleanOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, booleanOption ? booleanOption.value : null);
        break;
      case 'sex':
        const genderOption = this.genderOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, genderOption ? genderOption.value : null);
        break;
      case 'groups':
        const values: number[] = [];
        if (newValue) {
          newValue
            .split(', ')
            .forEach((label: string) =>
              values.push(
                this.groupsOptions.find((o) => o.label === label).value
              )
            );
        }
        super.updateField(field, values.length ? values : null);
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
