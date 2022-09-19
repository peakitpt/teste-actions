import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { EntityPerson } from 'src/app/components/persons/person.model';
import { State as FamiliesState } from 'src/app/components/families/reducers/families.reducer';
import { getEntityFamilies } from 'src/app/components/families/reducers/families.selectors';
import { RequestGetEntityFamilies } from 'src/app/components/families/reducers/families.actions';

@Component({
  selector: 'kyr-persons-details-personal-data-tab',
  templateUrl: './persons-details-personal-data-tab.component.html',
  styleUrls: ['./persons-details-personal-data-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonsDetailsPersonalDataTabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  environment = environment;
  families: Array<{ id: number; name: string }> = [];
  subs: Subscription[] = [];

  constructor(
    public sharedModule: SharedModule,
    private familiesStore: Store<FamiliesState>
  ) {}

  ngOnInit() {
    this.getEntityFamilies();
  }

  openDetails(modulePath: string, id: number) {
    window.open(`${modulePath}/${id}/details`, '_blank');
  }

  private getEntityFamilies() {
    if (this.model?.entity_id && !this.sharedModule.isDiocese()) {
      const families$ = this.familiesStore.select(getEntityFamilies);
      this.familiesStore.dispatch(
        new RequestGetEntityFamilies(this.model.entity_id)
      );
      this.subs.push(
        families$.subscribe(
          (entityFamilies: Array<{ id: number; name: string }>) => {
            this.families = entityFamilies;
          }
        )
      );
    }
  }
}
