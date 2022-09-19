import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ExpansionPanelItem } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Wedding } from '../../wedding.model';

@Component({
  selector: 'kyr-weddings-details-reports-tab',
  templateUrl: './weddings-details-reports-tab.component.html',
})
export class WeddingsDetailsReportsTabComponent implements AfterViewInit {
  @Input() modulePath: string;
  @Input() model: Wedding;

  expansionPanels: ExpansionPanelItem[] = [];
  groomBrideOptions = {};
  civilStatusOptions = {};
  articleOptions = {};
  declareOptions = {};
  certificateOptions = {};
  booleanOptions = {};
  religiousSituationOptions = {};

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

  constructor(
    public i18nextPipe: I18NextPipe,
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

    this.groomBrideOptions = {
      true: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.grooms_genders.groom`
      ),
      false: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.grooms_genders.bride`
      ),
    };

    this.civilStatusOptions = {
      'Casado(a) Catolicamente': this.i18nextPipe.transform(
        'translation:civil_statuses.catholic_married'
      ),
      'Casado(a) Civilmente': this.i18nextPipe.transform(
        'translation:civil_statuses.civil_married'
      ),
      'Divorciado(a)': this.i18nextPipe.transform(
        'translation:civil_statuses.divorced'
      ),
      'Divorciado(a) Civilmente': this.i18nextPipe.transform(
        'translation:civil_statuses.civil_divorced'
      ),
      'Divorciado(a) não Recasado(a)': this.i18nextPipe.transform(
        'translation:civil_statuses.divorced_not_remarried'
      ),
      'Divorciado(a) Recasado(a)': this.i18nextPipe.transform(
        'translation:civil_statuses.divorced_remarried'
      ),
      'Separado(a) Judicialmente': this.i18nextPipe.transform(
        'translation:civil_statuses.legally_separated'
      ),
      'Solteiro(a)': this.i18nextPipe.transform(
        'translation:civil_statuses.single'
      ),
      'União de Facto': this.i18nextPipe.transform(
        'translation:civil_statuses.union'
      ),
      'Viúvo(a)': this.i18nextPipe.transform(
        'translation:civil_statuses.widower'
      ),
      'Falecido(a)': this.i18nextPipe.transform(
        'translation:civil_statuses.deceased'
      ),
      Outro: this.i18nextPipe.transform('translation:civil_statuses.other'),
    };

    this.articleOptions = {
      0: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.article.him`
      ),
      1: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.article.her`
      ),
      2: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.article.them`
      ),
    };

    this.declareOptions = {
      0: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.declare.singular`
      ),
      1: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.declare.plural`
      ),
    };

    this.certificateOptions = {
      1: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.certificate.singular`
      ),
      2: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.certificate.plural`
      ),
    };

    this.booleanOptions = {
      true: this.i18nextPipe.transform('translation:yes'),
      false: this.i18nextPipe.transform('translation:no'),
    };

    this.religiousSituationOptions = {
      1: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.religious_situation.catholic_practicing`
      ),
      2: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.religious_situation.non_practicing`
      ),
      3: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.religious_situation.other_religion_without_faith`
      ),
      4: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.religious_situation.non_baptized`
      ),
      5: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.religious_situation.without_faith`
      ),
    };

    this.cdr.detectChanges();
  }
}
