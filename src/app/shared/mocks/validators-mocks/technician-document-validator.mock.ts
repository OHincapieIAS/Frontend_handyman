import { AbstractControl, ValidationErrors } from "@angular/forms";
import { techniciansMock } from "../technician.mock";

export async function technicianDocumentValidatorMock(control: AbstractControl) {
    return new Promise<ValidationErrors | null>((resolve, reject) => {
        const type = control.get('type')?.value;
        const number = control.get('number')?.value;
        if(!type || !number) {
            resolve(null);
        }
        else if (!techniciansMock.some(t => t.documentType === type && t.documentNumber === number)) {
            resolve({ notFoundDocument: true });
        } else {
            resolve(null);
        }
   })
}