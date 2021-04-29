import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const dateSelected = new Date(control.value);
    const dateNow = new Date();

    if (dateSelected.valueOf() >= dateNow.valueOf()) {
      return { customDateValidator: true };
    }
    return null;
  };
}
