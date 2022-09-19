import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getSection,
  getSelectedSections,
} from '../reducers/sections.selectors';
import * as actions from '../reducers/sections.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Section } from '../section.model';

@Component({
  selector: 'kyr-sections-delete',
  templateUrl: './sections-delete.component.html',
})
export class SectionsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Section[]>;
  modelList: Section[] = [];
  returnUrl = ['/sections'];
  modulePath = 'sections';

  selectorGetModel = getSection;
  selectorGetSelected = getSelectedSections;
  actionRequestFail = actions.SectionsActionTypes.RequestFailSections;
  actionRequestGetAll = actions.RequestGetAllSections;
  actionRequestGetOne = actions.RequestGetSection;
  actionRequestDelete = actions.RequestDeleteSection;
  actionSuccessDelete = actions.SectionsActionTypes.SuccessDeleteSection;
  actionSetSelected = actions.SetSelectedSections;
}
