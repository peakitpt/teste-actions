import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Institution } from '../../institution.model';

@Component({
  selector: 'kyr-institutions-details-permissions-tab',
  templateUrl: './institutions-details-permissions-tab.component.html',
})
export class InstitutionsDetailsPermissionsTabComponent {
  @Input() modulePath: string;
  @Input() model: Institution;
  @Input() permissionsAttributesDS: any;
  @Input() permissionsAttributesColumns: any[];
}
