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
import { State } from '../reducers/pastoral-agents-types.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/pastoral-agents-types.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getPastoralAgentsType } from '../reducers/pastoral-agents-types.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { PastoralAgentsType } from '../pastoral-agents-type.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-pastoral-agents-types-form',
  templateUrl: './pastoral-agents-types-form.component.html'
})
export class PastoralAgentsTypesFormComponent extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<PastoralAgentsType>;
  modulePath = 'pastoral-agents-types';

  selectorGetModel = getPastoralAgentsType;
  actionRequestFail = actions.PastoralAgentsTypesActionTypes.RequestFailPastoralAgentsTypes;
  actionRequestGetAll = actions.RequestGetAllPastoralAgentsTypes;
  actionRequestGetOne = actions.RequestGetPastoralAgentsType;
  actionRequestPut = actions.RequestPutPastoralAgentsType;
  actionSuccessPut = actions.PastoralAgentsTypesActionTypes.SuccessPutPastoralAgentsType;
  actionRequestPost = actions.RequestPostPastoralAgentsType;
  actionSuccessPost = actions.PastoralAgentsTypesActionTypes.SuccessPostPastoralAgentsType;


  pastoralAgentsTypesGroupsOptions = this.sharedModule.getPastoralAgentsTypesGroupsOptions();

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
      description: [null, Validators.required],
      group: [],
    });
  }
}
