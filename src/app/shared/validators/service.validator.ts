import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { ServicesService } from "@shared/services/services-service/services.service";

@Injectable({ providedIn: 'root' })
export class ServiceValidator implements AsyncValidator {

  constructor(private servicesService: ServicesService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> { 
    return this.servicesService.validateServiceById(control.value).pipe(
      map(isValid => (!isValid ? { notFoundService: true } : null) ),
      catchError( () => of({ notFoundService: true }) )
    );
  }

}