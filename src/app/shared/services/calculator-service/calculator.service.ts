import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalculatorHoursResponse } from '@app/shared/models/calculator-hours.model';
import { ServiceTechnicianModel, ServiceTechnicianModelToCalculate } from '@shared/models/service-technician.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private readonly url = `${environment.apiUrl}/service-technician/calculate`;
  constructor(private readonly http: HttpClient) { }

  consultHoursWorked(serviceTechnician: ServiceTechnicianModelToCalculate): Observable<CalculatorHoursResponse[]> {
    return this.http.post<CalculatorHoursResponse[]>(`${this.url}`,  serviceTechnician );
  }
}
