import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnvironmentImpl } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { FileUploaderService } from '@peakitpt/ui-kyrios-api';
import { debounceTime, pairwise } from 'rxjs/operators';

@Component({
  selector: 'kyr-image-field',
  templateUrl: './image-field.component.html',
  styles: [`
    .photo-img-edit {
      height: 160px;
      max-height: 160px;
    }
  `]
})
export class ImageFieldComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() customClass: string;
  @Input() required: boolean = false;
  @Input() form: FormControl;
  @Input() imageValue: string;
  @Input() readonly: boolean = false;
  @Input() name: string;

  @Input() successPostImageActionCallback: Function;
  @Input() onImageChange: Function;

  currentImage: { name: string, path: string } = {
    name: null,
    path: null,
  };
  subs: Subscription[] = [];

  componentOk: boolean = true;
  componentErrors: string[] = [];

  uploadSub: Subscription;

  constructor(
    private fileUploaderService: FileUploaderService) { }

  ngOnInit() {
    this.handleComponentErrors();
    if (this.componentOk) {
      this.subs.push(this.form.get(this.name).valueChanges.subscribe((value: any) => {
          this.onImageChange(value, this.form, this.currentImage);
        })
      );
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  changeImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentImage.name = event.target.files[0].name;
        this.currentImage.path = eventReader.target.result;

        const fd = new FormData();
        fd.append('file', event.target.files[0], event.target.files[0].name);
        this.uploadSub = this.fileUploaderService.upload(fd).subscribe((result: any) => {
          if (result && result.filename === this.currentImage.name) {
            this.currentImage.path = this.getUploadFileLink(result.filePath);
            this.successPostImageActionCallback(this.form, result);
            this.uploadSub.unsubscribe();
          }
        });
        this.subs.push(this.uploadSub);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  getUploadFileLink(path: string): string {
    return this._getUploadFileLink(environment, path);
  }

  _getUploadFileLink(environment: EnvironmentImpl, path: string): string {
    if (!path) {
      return 'assets/image-placeholder-350x350.png';
    } else if (path.startsWith('/files') || path.startsWith('/uploads')) {
      return `${environment.railsAppUrl}${path}`;
    } else if (path.startsWith('/var/www')) {
      return `${environment.railsAppUrl}${path.split('public')[1]}`;
    } else if (path.startsWith('/filemanagers')) {
      try {
        return this._getUploadFileLink(
          environment,
          atob(path.split('?f=')[1].split('&fn=')[0])
        );
      } catch {
        return this._getUploadFileLink(
          environment,
          `${path.split('?f=')[1].split('&fn=')[0]}`
        );
      }
    } else if (path.startsWith("/app/public/uploads/RackMultipart")) {
      return `${environment.railsAppUrl}${path.split('public')[1]}`;
    }  else if (path.startsWith('public/uploads/tmp/')) {
      return `${environment.apiUploaderUrl}${path.split('uploads')[1]}`;
    } else {
      return `${environment.apiUploaderUrl}/${path}`;
    }
  }

  handleComponentErrors() {
    if (this.successPostImageActionCallback === undefined) {
      this.componentOk = false;
      this.componentErrors.push(`Missing the parameter successPostImageActionCallback, example: successPostImageActionCallback: (form: any, result: any) => {
    form.get('entity.photo_url').setValue(result.filePath);
    form.get('entity.photo_filename').setValue(result.filename);
  }`);
    }
    if (this.form === undefined) {
      this.componentOk = false;
      this.componentErrors.push(`Missing the parameter form`);
    }
  }
}