import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/sections.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/sections.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getSection } from '../reducers/sections.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Section } from '../section.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-sections-form',
  templateUrl: './sections-form.component.html',
})
export class SectionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Section>;
  modulePath = 'sections';

  selectorGetModel = getSection;
  actionRequestFail = actions.SectionsActionTypes.RequestFailSections;
  actionRequestGetAll = actions.RequestGetAllSections;
  actionRequestGetOne = actions.RequestGetSection;
  actionRequestPut = actions.RequestPutSection;
  actionSuccessPut = actions.SectionsActionTypes.SuccessPutSection;
  actionRequestPost = actions.RequestPostSection;
  actionSuccessPost = actions.SectionsActionTypes.SuccessPostSection;

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
      reference: [null, Validators.required],
    });
  }
}
