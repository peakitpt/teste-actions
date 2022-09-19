import { Component, Input } from '@angular/core';

@Component({
  selector: 'kyr-catechisms-details-sessions-tab',
  templateUrl: './catechisms-details-sessions-tab.component.html',
})
export class CatechismsDetailsSessionsTabComponent {
  @Input() modulePath: string;
  @Input() catechismId: number;
  @Input() finalized: boolean;
}
