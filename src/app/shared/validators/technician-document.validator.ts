import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { TechnicianService } from "@shared/services/technician-service/technician.service";

@Injectable({ providedIn: 'root' })
export class TechnicianDocumentValidator implements AsyncValidator {

  constructor(private technicianService: TechnicianService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const type = control.get('type')?.value;
    const number = control.get('number')?.value;
    
    if (!type || !number) {
        return of(null);
    }
    
    return this.technicianService.validateTechnicianByDocument(type, number).pipe(
      map(isValid => (!isValid ? { notFoundDocument: true } : null)),
      catchError(() => of({ notFoundDocument: true }))
    );
  }
}