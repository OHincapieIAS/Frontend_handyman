import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceTechnicianModel } from '@shared/models/service-technician.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceTechnicianService {

  private readonly url = `${environment.apiUrl}/service-technician`;
  constructor(private readonly http: HttpClient) { }

  saveServiceTechnician(serviceTechnician: ServiceTechnicianModel): Observable<ServiceTechnicianModel> {
    return this.http.post<ServiceTechnicianModel>(`${this.url}`,  serviceTechnician );
  }
}
