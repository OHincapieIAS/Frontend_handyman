import { AbstractControl, ValidationErrors } from "@angular/forms";
import { servicesMock } from "../service.mock";

export async function serviceValidatorMock(control: AbstractControl) {
    return new Promise<ValidationErrors | null>((resolve, reject) => {
        if(!control.value) {
            resolve(null);
        }
        else if (!servicesMock.some(s => s.id === control.value)) {
            resolve({ notFoundService: true });
        } else {
            resolve(null);
        }
   })
}