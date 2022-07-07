import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minDateTimeLocalValidator(date: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value) return null;
        const controlValue: Date = new Date(control.value);
        // console.log(controlValue.toISOString() + " < " + date.toISOString());
        const forbidden = controlValue.getTime() <= date.getTime();
        return forbidden ? {invalidDate: {value: control.value}} : null;
    };
}

export function maxDateTimeLocalValidator(date: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value) return null;
        const controlValue: Date = new Date(control.value);
        // console.log(controlValue.toISOString() + " > " + date.toISOString());
        const forbidden = controlValue.getTime() >= date.getTime();
        return forbidden ? {invalidDate: {value: control.value}} : null;
    };
}

export const intervalDateTimeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const startDateControlValue = control.get('startDate')?.value;
    const finalDateControlValue = control.get('finalDate')?.value;
    if(!startDateControlValue || !finalDateControlValue) {
        return null;
    }
    const startDate = new Date(startDateControlValue);
    const finalDate = new Date(finalDateControlValue);
    return startDate.getTime() >= finalDate.getTime() ? { invalidIntervalDate: true } : null;
  };