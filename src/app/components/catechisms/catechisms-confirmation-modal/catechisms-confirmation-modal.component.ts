import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { DialogComponent } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { Catechism } from '../catechism.model';

type ActionType =
  | 'passing_grade'
  | 'passing_grade_finalize'
  | 'finalize'
  | 'save_with_missing_sponsors'
  | 'save_when_student_exists_on_another_catechism';

@Component({
  selector: 'kyr-catechisms-confirmation-modal',
  templateUrl: './catechisms-confirmation-modal.component.html',
})
export class CatechismsConfirmationModalComponent
  implements OnInit, AfterViewInit {
  modulePath: string = 'catechisms';

  bodyMessage: string;
  passYear: boolean = false;
  finalize: boolean = false;
  saveWithMissingSponsors: boolean = false;
  saveWhenStudentExistsOnAnotherCatechism: boolean = false;

  @Input() model: Catechism;
  @Input() action: ActionType;
  @Input() studentNamesOnAnotherCatechism: Array<string>;
  @Input() classYear: string;

  @Output() emitModalClose = new EventEmitter();

  @ViewChild('modal') modal: DialogComponent;

  constructor(public i18next: I18NextPipe, public sharedModule: SharedModule) {}

  ngOnInit() {
    switch (this.action) {
      case 'passing_grade':
        this.bodyMessage = this.i18next.transform(
          `${this.modulePath}:message.passing_grade_message`
        );
        break;
      case 'passing_grade_finalize':
        this.bodyMessage = this.i18next.transform(
          `${this.modulePath}:message.passing_grade_finalize_message`
        );
        break;
      case 'finalize':
        this.bodyMessage = this.i18next.transform(
          `${this.modulePath}:message.finalize_message`
        );
        break;
      case 'save_when_student_exists_on_another_catechism':
        this.bodyMessage = this.i18next.transform(
          `${this.modulePath}:message.student_exists_on_another_catechism_message`,
          {
            count: this.studentNamesOnAnotherCatechism.length,
            student_names: this.getStudentsOnAnotherCatchismNames(),
            class_year: this.classYear,
          }
        );
        break;
      case 'save_with_missing_sponsors':
        this.bodyMessage = this.i18next.transform(
          `${this.modulePath}:message.missing_sponsors_message`
        );
        break;
      default:
        break;
    }
  }

  ngAfterViewInit() {
    this.modal.open();
  }

  modalClose() {
    this.emitModalClose.emit({
      action: this.action,
      passYear: this.passYear,
      finalize: this.finalize,
      saveWhenStudentExistsOnAnotherCatechism: this
        .saveWhenStudentExistsOnAnotherCatechism,
      saveWithMissingSponsors: this.saveWithMissingSponsors,
    });
  }

  confirm() {
    switch (this.action) {
      case 'passing_grade':
        this.passYear = true;
        this.finalize = false;
        this.saveWhenStudentExistsOnAnotherCatechism = false;
        this.saveWithMissingSponsors = false;
        this.modal.close();
        break;
      case 'passing_grade_finalize':
        this.passYear = true;
        this.finalize = true;
        this.saveWhenStudentExistsOnAnotherCatechism = false;
        this.saveWithMissingSponsors = false;
        this.modal.close();
        break;
      case 'finalize':
        this.passYear = false;
        this.finalize = true;
        this.saveWhenStudentExistsOnAnotherCatechism = false;
        this.saveWithMissingSponsors = false;
        this.modal.close();
        break;
      case 'save_when_student_exists_on_another_catechism':
        this.passYear = false;
        this.finalize = false;
        this.saveWhenStudentExistsOnAnotherCatechism = true;
        this.saveWithMissingSponsors = false;
        this.modal.close();
        break;
      case 'save_with_missing_sponsors':
        this.passYear = false;
        this.finalize = false;
        this.saveWhenStudentExistsOnAnotherCatechism = true;
        this.saveWithMissingSponsors = true;
        this.modal.close();
        break;
      default:
        break;
    }
  }

  private getStudentsOnAnotherCatchismNames(): string {
    const names: Array<string> = [...this.studentNamesOnAnotherCatechism];

    let result: string;
    if (names.length > 1) {
      const lastName = names.pop();
      result = `"${names.join(', ')}"`;
      result += ` ${this.i18next.transform('translation:and')} "${lastName}"`;
    } else {
      result = `"${names[0]}"`;
    }

    return result;
  }
}
