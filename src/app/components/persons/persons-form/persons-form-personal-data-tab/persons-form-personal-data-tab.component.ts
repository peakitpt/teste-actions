import { AfterViewInit, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { State } from '../../reducers/persons.reducer';
import { environment } from 'src/environments/environment';
import * as actions from '../../reducers/persons.actions';
import { Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-persons-form-personal-data-tab',
  templateUrl: './persons-form-personal-data-tab.component.html',
  styleUrls: ['./persons-form-personal-data-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonsFormPersonalDataTabComponent implements AfterViewInit {
  @Input() modulePath: string;
  @Input() id: number;
  @Input() form: FormGroup;
  @Input() todayDate: Date;
  @Input() ageControl: FormControl;
  @Input() currentImage: { name: string, path: string };
  @Input() subs: Subscription[] = [];

  @Input() leftTemplate: TemplateRef<any>;
  @Input() countriesRightTemplate: TemplateRef<any>;
  @Input() chapelriesRightTemplate: TemplateRef<any>;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;
  @Input() personsRightTemplate: TemplateRef<any>;

  genderOptions = this.sharedModule.getGenders();
  civilStatusesOptions = this.sharedModule.getCivilStatuses();
  qualificationsOptions = this.sharedModule.getQualifications();
  documentTypesOptions = this.sharedModule.getIdentificationDocsTypes();
  weddingTypesOptions = this.sharedModule.getWeddingTypes();

  environment = environment;

  constructor(
    public store: Store<State>,
    public sharedModule: SharedModule,
    private actionSubject: ActionsSubject
  ) {}

  ngAfterViewInit() {
    this.subs.push(this.successChangeImage());
  }

  changeImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentImage.name = event.target.files[0].name;
        this.currentImage.path = eventReader.target.result;

        const fd = new FormData();
        fd.append('file', event.target.files[0], event.target.files[0].name);
        this.store.dispatch(new actions.RequestPostImage(fd));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  successChangeImage(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.PersonsActionTypes.SuccessPostImage))
      .subscribe((result: any) => {
        if (result && result.payload.filename === this.currentImage.name) {
          this.currentImage.path = this.sharedModule.getUploadFileLink(this.environment, result.payload.filePath);
          this.form.get('entity.photo_url').setValue(result.payload.filePath);
          this.form.get('entity.photo_filename').setValue(this.currentImage.name);
        }
      });
  }

  hideWeddingFields(): boolean {
    switch (this.form.get('maritial_status').value) {
      case 'Catholic': // en
      case 'Civilian': // en
      case 'Union of Fact': // en
      case 'Católico': // pt
      case 'Civil': // pt
      case 'União de Facto': // pt
      case 'Católico': // es
      case 'Civil': // es
      case 'Unión de Hechos': // es
        return false;
      case null:
      default:
        return true;
    }
  }
}
