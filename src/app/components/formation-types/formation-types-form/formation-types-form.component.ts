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

import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/formation-types.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/formation-types.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getFormationType } from '../reducers/formation-types.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { FormationType } from '../formation-type.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-formation-types-form',
  templateUrl: './formation-types-form.component.html'
})
export class FormationTypesFormComponent extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<FormationType>;
  modulePath = 'formation-types';

  selectorGetModel = getFormationType;
  actionRequestFail =
    actions.FormationTypesActionTypes.RequestFailFormationTypes;
  actionRequestGetAll = actions.RequestGetAllFormationTypes;
  actionRequestGetOne = actions.RequestGetFormationType;
  actionRequestPut = actions.RequestPutFormationType;
  actionSuccessPut = actions.FormationTypesActionTypes.SuccessPutFormationType;
  actionRequestPost = actions.RequestPostFormationType;
  actionSuccessPost =
    actions.FormationTypesActionTypes.SuccessPostFormationType;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject
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
      description: [null, Validators.required]
    });
  }
}
