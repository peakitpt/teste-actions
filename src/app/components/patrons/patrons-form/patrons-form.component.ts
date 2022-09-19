import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/patrons.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/patrons.actions';
import * as modalActions from '../../../shared/components/modals/patrons-modal/reducers/patrons-modal.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getPatron } from '../reducers/patrons.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Patron } from '../patrons.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-patrons-form',
  templateUrl: './patrons-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PatronsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Patron>;
  modulePath = 'patrons';

  selectorGetModel = getPatron;
  actionRequestFail = actions.PatronsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.PatronsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.PatronsActionTypes.SuccessPost;

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
      validated: [],
      name: [null, Validators.required],
    });
  }
}
