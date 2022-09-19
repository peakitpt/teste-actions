import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/relationship-degrees.actions';
import { getRelationshipDegree } from '../reducers/relationship-degrees.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { RelationshipDegree } from '../relationship-degree.model';

@Component({
  selector: 'kyr-relationship-degrees-form',
  templateUrl: './relationship-degrees-form.component.html',
})
export class RelationshipDegreesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<RelationshipDegree>;
  modulePath = 'relationship-degrees';
  preFillWithNew = true;

  selectorGetModel = getRelationshipDegree;
  actionRequestFail = actions.RelationshipDegreesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.RelationshipDegreesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.RelationshipDegreesActionTypes.SuccessPost;

  localeOptions = [
    {
      value: 'pt',
      label: this.i18nextPipe.transform(`translation:_languages.pt`),
    },
    {
      value: 'en',
      label: this.i18nextPipe.transform(`translation:_languages.en`),
    },
    {
      value: 'es',
      label: this.i18nextPipe.transform(`translation:_languages.es`),
    },
  ];

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, Validators.required],
      validated: [true, Validators.required],
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      inserted_by_user: [false],
      locale: ['pt', Validators.required],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
