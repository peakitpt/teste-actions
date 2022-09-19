import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExpansionPanelItem } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-weddings-form-reports-tab',
  templateUrl: './weddings-form-reports-tab.component.html',
})
export class WeddingsFormReportsTabComponent implements AfterViewInit {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() chapelriesRightTemplate: TemplateRef<any>;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;

  expansionPanels: ExpansionPanelItem[] = [];
  groomBrideOptions: Array<{ label: string; value: any }> = [];
  civilStatusOptions: Array<{ label: string; value: any }> = [];
  articleOptions: Array<{ label: string; value: any }> = [];
  declareOptions: Array<{ label: string; value: any }> = [];
  certificateOptions: Array<{ label: string; value: any }> = [];
  booleanOptions: Array<{ label: string; value: boolean }> = [];
  religiousSituationOptions: Array<{ label: string; value: any }> = [];

  @ViewChild('mod3Template')
  mod3Template: TemplateRef<any>;
  @ViewChild('mod4Template') mod4Template: TemplateRef<any>;
  @ViewChild('mod5Template')
  mod5Template: TemplateRef<any>;
  @ViewChild('mod6Template')
  mod6Template: TemplateRef<any>;
  @ViewChild('mod7Template')
  mod7Template: TemplateRef<any>;
  @ViewChild('mod8Template')
  mod8Template: TemplateRef<any>;
  @ViewChild('mod9Template')
  mod9Template: TemplateRef<any>;
  @ViewChild('mod12Template')
  mod12Template: TemplateRef<any>;
  @ViewChild('groomDialogTemplate')
  groomDialogTemplate: TemplateRef<any>;
  @ViewChild('brideDialogTemplate')
  brideDialogTemplate: TemplateRef<any>;
  @ViewChild('frequenceInscriptionsCPMTemplate')
  frequenceInscriptionsCPMTemplate: TemplateRef<any>;
  @ViewChild('birthCertificateTemplate')
  birthCertificateTemplate: TemplateRef<any>;

  // Querry String Params
  witnessesQSP = {
    modal: true,
    serialize: 'persons_name_place_birth_date',
  };
  groomMarriedWithWhoQSP = {
    modal: true,
    entity_type: 'Paroquianos',
    sex: false,
    serialize: 'parishioners_simple',
    format: 'json',
    documents: true,
  };
  brideMarriedWithWhoQSP = {
    modal: true,
    entity_type: 'Paroquianos',
    sex: true,
    serialize: 'parishioners_simple',
    format: 'json',
    documents: true,
  };
  groomDialogVicarQSP = {
    modal: true,
    entity_type: 'Sacerdote',
    serialize: 'parishioners_simple',
    format: 'json',
    documents: true,
  };

  constructor(
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.expansionPanels = [
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.mod3`),
        template: this.mod3Template,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.mod4`),
        template: this.mod4Template,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.mod5`),
        template: this.mod5Template,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.mod6`),
        template: this.mod6Template,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.mod7`),
        template: this.mod7Template,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.mod8`),
        template: this.mod8Template,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.mod9`),
        template: this.mod9Template,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:header.mod12`),
        template: this.mod12Template,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.groom_dialog`
        ),
        template: this.groomDialogTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.bride_dialog`
        ),
        template: this.brideDialogTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.frequence_inscriptions_cpm`
        ),
        template: this.frequenceInscriptionsCPMTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.birth_certificate`
        ),
        template: this.birthCertificateTemplate,
      } as ExpansionPanelItem,
    ];

    this.groomBrideOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.grooms_genders.groom`
        ),
        value: true,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.grooms_genders.bride`
        ),
        value: false,
      },
    ];

    this.civilStatusOptions = [
      {
        label: '----',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.catholic_married'
        ),
        value: 'Casado(a) Catolicamente',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.civil_married'
        ),
        value: 'Casado(a) Civilmente',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.divorced'
        ),
        value: 'Divorciado(a)',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.civil_divorced'
        ),
        value: 'Divorciado(a) Civilmente',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.divorced_not_remarried'
        ),
        value: 'Divorciado(a) não Recasado(a)',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.divorced_remarried'
        ),
        value: 'Divorciado(a) Recasado(a)',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.legally_separated'
        ),
        value: 'Separado(a) Judicialmente',
      },
      {
        label: this.i18nextPipe.transform('translation:civil_statuses.single'),
        value: 'Solteiro(a)',
      },
      {
        label: this.i18nextPipe.transform('translation:civil_statuses.union'),
        value: 'União de Facto',
      },
      {
        label: this.i18nextPipe.transform('translation:civil_statuses.widower'),
        value: 'Viúvo(a)',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.deceased'
        ),
        value: 'Falecido(a)',
      },
      {
        label: this.i18nextPipe.transform('translation:civil_statuses.other'),
        value: 'Outro',
      },
    ];

    this.articleOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.article.him`
        ),
        value: 0,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.article.her`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.article.them`
        ),
        value: 2,
      },
    ];

    this.declareOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.declare.singular`
        ),
        value: 0,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.declare.plural`
        ),
        value: 1,
      },
    ];

    this.certificateOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.certificate.singular`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.certificate.plural`
        ),
        value: 2,
      },
    ];

    this.booleanOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform('translation:yes'),
        value: true,
      },
      {
        label: this.i18nextPipe.transform('translation:no'),
        value: false,
      },
    ];

    this.religiousSituationOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.religious_situation.catholic_practicing`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.religious_situation.non_practicing`
        ),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.religious_situation.other_religion_without_faith`
        ),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.religious_situation.non_baptized`
        ),
        value: 4,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.religious_situation.without_faith`
        ),
        value: 5,
      },
    ];

    this.cdr.detectChanges();
  }
}
