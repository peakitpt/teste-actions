import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';

import {
  Catechism,
  CatechismSession,
  CatechismSessionPresence,
  CatechismStudent,
} from '../../../../catechism.model';
import {
  getCatechism,
  getSession,
} from '../../../../reducers/catechisms.selectors';
import * as actions from '../../../../reducers/catechisms.actions';
import { TableDataSource } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-catechisms-sessions-form',
  templateUrl: './catechisms-sessions-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatechismsSessionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CatechismSession>;
  model: CatechismSession;
  modulePath = 'catechisms';

  @Input() catechismId: number;
  @Input() finalized: boolean;
  @Input() sessionId: number;
  @Input() duplicateMode: boolean;
  @Output() emitModalClose = new EventEmitter();

  selectorGetModel = getSession;
  actionRequestFail = actions.CatechismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGetSession;
  actionRequestPut = actions.RequestPutSession;
  actionSuccessPut = actions.CatechismsActionTypes.SuccessPutSession;
  actionRequestPost = actions.RequestPostSession;
  actionSuccessPost = actions.CatechismsActionTypes.SuccessPostSession;

  @ViewChild('entityTemplate') entityTemplate: TemplateRef<any>;
  @ViewChild('presencesTemplate') presencesTemplate: TemplateRef<any>;

  /* This specific's component fields */
  presencesColumns: any[] = [];
  presencesDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  presencesFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource

  isSessionDeleteOpen = false;

  ngOnInit() {
    if (this.finalized) {
      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.cant_manage_finalized_catechism_session`
        ),
        this.sharedModule.ERROR_COLOR
      );
    } else {
      this.initializeForm();
      this.initKeysToIgnoreOnDuplicate();
      this.isLoading = true;

      if (this.sessionId) {
        if (!this.duplicateMode) {
          this.addToHeaderOptionsMenu();
        }

        this.model$ = this.store.select(this.selectorGetModel);
        this.store.dispatch(
          new this.actionRequestGetOne({
            catechismId: this.catechismId,
            id: this.sessionId,
          })
        );

        this.subs.push(
          this.model$.subscribe((obj: any) => {
            if (obj) {
              this.model = obj;
              this.setFormValues(obj);
              this.isLoading = false;
            }
          })
        );
      } else {
        const catechism$: Observable<Catechism> =
          this.store.select(getCatechism);
        this.subs.push(
          catechism$.subscribe((catechism: any) => {
            if (catechism) {
              if (catechism.catechisms_students_attributes?.length) {
                catechism.catechisms_students_attributes.forEach(
                  (student: CatechismStudent) => {
                    const newObj: CatechismSessionPresence = {
                      entity_id: student.entity_id,
                      entity_description: student.entity_description,
                      present: false,
                    };
                    this.addTableLine(
                      newObj,
                      this.presencesFormArray,
                      this.presencesDS
                    );
                  }
                );
              }
              this.isLoading = false;
            }
          })
        );
      }
    }
  }

  onAfterViewInit() {
    this.buildPresencesTableColumns();
  }

  initializeForm() {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      summary: [null, Validators.required],
      observations: [],
      presences: [0],
      catechism_id: [this.catechismId],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      id: [],
      updated_at: [],
      updated_by_user_id: [],
      catechisms_sessions_presences_attributes: this.fb.array([]),
    });
  }

  initKeysToIgnoreOnDuplicate() {
    super.initKeysToIgnoreOnDuplicate(['catechism_id']);
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    this.setInnerTable(
      obj.catechisms_sessions_presences_attributes,
      this.presencesFormArray,
      this.presencesDS,
      ['catechisms_session_id', 'present']
    );
  }

  onFormValid() {
    if (this.validatePresences()) {
      const payload = {
        catechismId: this.catechismId,
        form: this.form.getRawValue(),
      };

      if (this.sessionId) {
        this.store.dispatch(new this.actionRequestPut(payload));
      } else {
        this.store.dispatch(new this.actionRequestPost(payload));
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_blank_presences`
        )
      );
    }
  }

  onSaveSuccess(_result: any) {
    this.isLoading = true;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(
        `${this.modulePath}:message.save_session_success`
      ),
      this.sharedModule.SUCCESS_COLOR
    );

    if (this.saveAndNew) {
      this.isLoading = false;
    }

    this.modal.close();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'save_new':
        this.saveAndNew = true;
        this.onSubmit();
        break;
      case 'delete':
        this.store.dispatch(new actions.SetSelectedSession([this.model]));
        this.isSessionDeleteOpen = true;
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  modalClose() {
    this.emitModalClose.emit(this.saveAndNew);
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private buildPresencesTableColumns() {
    setTimeout(() => {
      this.presencesColumns = [
        {
          id: 'entity_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_sessions.catechisms_sessions_presences_attributes.entity_description`
          ),
          required: true,
          sortable: false,
          template: this.entityTemplate,
        },
        {
          id: 'present',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_sessions.catechisms_sessions_presences_attributes.present`
          ),
          sortable: false,
          template: this.presencesTemplate,
        },
      ];
    });
  }

  private validatePresences(): boolean {
    let presencesValid = true;

    this.form.setControl(
      'catechisms_sessions_presences_attributes',
      this.fb.array(this.presencesFormArray.value)
    );

    this.form.value.catechisms_sessions_presences_attributes
      .filter(
        (obj: CatechismSessionPresence) => !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: CatechismSessionPresence, i: number) => {
        const lineCopy = { ...obj };

        if (!lineCopy.entity_id || !lineCopy.entity_description) {
          presencesValid = false;
        } else {
          this.form.value.catechisms_sessions_presences_attributes[i] =
            lineCopy;
        }
      });

    return presencesValid;
  }

  closeSessionDeleteModal(confirmDelete: boolean) {
    this.isSessionDeleteOpen = false;
    if (confirmDelete) {
      this.modal.close();
    }
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
