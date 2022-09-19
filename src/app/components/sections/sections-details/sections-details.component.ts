import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/sections.actions';
import { getSection } from '../reducers/sections.selectors';
import { Observable } from 'rxjs';
import { Section } from '../section.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-sections-details',
  templateUrl: './sections-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SectionsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Section>;
  returnUrl = '/sections';
  modulePath = 'sections';
  viewName = 'Section';

  selectorGetModel = getSection;
  actionRequestFail = actions.SectionsActionTypes.RequestFailSections;
  actionRequestGetOne = actions.RequestGetSection;
}
