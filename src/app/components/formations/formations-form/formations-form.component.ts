import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { State } from '../reducers/formations.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/formations.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getFormation } from '../reducers/formations.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Formation } from '../formation.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { State as FormationTypesState } from 'src/app/shared/components/modals/formation-types-modal/reducers/formation-types-modal.reducer';
import { getModalRowFormationType } from '../../formation-types/reducers/formation-types.selectors';
import { getFormationTypesSelected } from 'src/app/shared/components/modals/formation-types-modal/reducers/formation-types-modal.selectors';

@Component({
  selector: 'kyr-formations-form',
  templateUrl: './formations-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormationsFormComponent extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<Formation>;
  modulePath = 'formations';

  selectorGetModel = getFormation;
  actionRequestFail = actions.FormationsActionTypes.RequestFailFormations;
  actionRequestGetAll = actions.RequestGetAllFormations;
  actionRequestGetOne = actions.RequestGetFormation;
  actionRequestPut = actions.RequestPutFormation;
  actionSuccessPut = actions.FormationsActionTypes.SuccessPutFormation;
  actionRequestPost = actions.RequestPostFormation;
  actionSuccessPost = actions.FormationsActionTypes.SuccessPostFormation;

  formationTypesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private formationTypesStore: Store<FormationTypesState>
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      fb,
      i18nextPipe,
      snackBarService,
      actionSubject
    );
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      description: [null, Validators.required],
      formations_type_id: [null, Validators.required],
      formations_type_description: [null, Validators.required],
      entity_ekklesia_location_id: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [],
      deleted_by_user_id: [],
      sync_id: [],
      updated_at: [],
      updated_by_user_id: []
    });
  }
  ngOnInit() {
    super.ngOnInit();
    this.setFormationTypesModal();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'save_new': {
        this.onSubmit();
        this.router
          .navigate([`/${this.modulePath}`])
          .then(() => this.navigate(`/${this.modulePath}/new`));
        break;
      }
      case 'delete': {
        if (this.id) {
          this.navigate(`/${this.modulePath}/${this.id}/edit', 'delete`);
        }
        break;
      }
      case 'clear_formation-types_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      }
      case 'view_selected_formation-types': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('formation-types', id);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  private setFormationTypesModal() {
    this.formationTypesMenuOptions = this.defaultModalMenu('formation-types');

    // When a row is selected
    this.subs.push(
      this.formationTypesStore
        .select(getFormationTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.description);
          }
        })
    );
  }
}
