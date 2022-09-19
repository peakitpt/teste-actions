import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/numerations-views.actions';
import { getNumerationsView } from '../reducers/numerations-views.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { NumerationsView } from '../numerations-view.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { State } from '../reducers/numerations-views.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';
import { State as NumerationsState } from 'src/app/shared/components/modals/numerations-modal/reducers/numerations-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { getNumerationsSelected } from 'src/app/shared/components/modals/numerations-modal/reducers/numerations-modal.selectors';
import { ModulesService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-numerations-views-form',
  templateUrl: './numerations-views-form.component.html',
})
export class NumerationsViewsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<NumerationsView>;
  modulePath = 'numerations-views';

  selectorGetModel = getNumerationsView;
  actionRequestFail =
    actions.NumerationsViewsActionTypes.RequestFailNumerationsViews;
  actionRequestGetAll = actions.RequestGetAllNumerationsViews;
  actionRequestGetOne = actions.RequestGetNumerationsView;
  actionRequestPut = actions.RequestPutNumerationsView;
  actionSuccessPut =
    actions.NumerationsViewsActionTypes.SuccessPutNumerationsView;
  actionRequestPost = actions.RequestPostNumerationsView;
  actionSuccessPost =
    actions.NumerationsViewsActionTypes.SuccessPostNumerationsView;

  numerationsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  modules = [];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private numerationsStore: Store<NumerationsState>,
    private modulesService: ModulesService
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
      block_remove: [false],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      entity_id: [null],
      id: [],
      numeration_description: [null, Validators.required],
      numeration_id: [null, Validators.required],
      sync_at: [],
      updated_by_user_id: [],
      view_id: [null, Validators.required],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getModules();
    this.setNumerationsModal();
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
      case 'clear_numerations_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      }
      case 'view_selected_numerations': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('numerations', id);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  private setNumerationsModal() {
    this.numerationsMenuOptions = this.defaultModalMenu('numerations');

    // When a row is selected
    this.subs.push(
      this.numerationsStore
        .select(getNumerationsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.name);
          }
        })
    );
  }

  getModules() {
    const payload = {
      use_translation: true,
      numerable: true,
      model: 'view_items/view',
    };
    this.subs.push(
      this.modulesService.getAll(payload).subscribe((r) => {
        r.results.forEach((module) => {
          this.modules.push({
            label: module.name,
            value: module.id,
          });
        });
      })
    );
  }
}
