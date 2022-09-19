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

@Component({
  selector: 'kyr-baptisms-form-reports-tab',
  templateUrl: './baptisms-form-reports-tab.component.html',
})
export class BaptismsFormReportsTabComponent implements AfterViewInit {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;
  @Input() priestsRightTemplate: TemplateRef<any>;

  expansionPanels: ExpansionPanelItem[] = [];
  malePronounsOptions: Array<{ label: string; value: boolean }> = [];
  femalePronounsOptions: Array<{ label: string; value: boolean }> = [];
  godparentsOptions: Array<{ label: string; value: boolean }> = [];

  @ViewChild('baptismInscriptionTemplate')
  baptismInscriptionTemplate: TemplateRef<any>;
  @ViewChild('baptismEntryTemplate') baptismEntryTemplate: TemplateRef<any>;
  @ViewChild('baptismCertificateTemplate')
  baptismCertificateTemplate: TemplateRef<any>;
  @ViewChild('suitabilityRequestTemplate')
  suitabilityRequestTemplate: TemplateRef<any>;
  @ViewChild('preparationCoursesTemplate')
  preparationCoursesTemplate: TemplateRef<any>;

  constructor(
    public i18nextPipe: I18NextPipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.expansionPanels = [
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.baptism_inscription`
        ),
        template: this.baptismInscriptionTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.baptism_entry`
        ),
        template: this.baptismEntryTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.baptism_certificate`
        ),
        template: this.baptismCertificateTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.suitability_request`
        ),
        template: this.suitabilityRequestTemplate,
      } as ExpansionPanelItem,
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:header.preparation_courses`
        ),
        template: this.preparationCoursesTemplate,
      } as ExpansionPanelItem,
    ];

    this.malePronounsOptions = [
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:pronouns.male.the`
        ),
        value: true,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:pronouns.male.by_the`
        ),
        value: false,
      },
    ];

    this.femalePronounsOptions = [
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:pronouns.female.the`
        ),
        value: true,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:pronouns.female.by_the`
        ),
        value: false,
      },
    ];

    this.godparentsOptions = [
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:header.godfather`
        ),
        value: true,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:header.godmother`
        ),
        value: false,
      },
    ];

    this.cdr.detectChanges();
  }
}
