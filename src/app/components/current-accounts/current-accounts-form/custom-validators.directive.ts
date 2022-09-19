import { AbstractControl, ValidatorFn } from '@angular/forms';

export function maxValueOrZeroValidator(maxValue: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = +control.value <= maxValue || +control.value === 0;
    return valid ? null : { valueLowerThanMax: { value: control.value } };
  };
}
