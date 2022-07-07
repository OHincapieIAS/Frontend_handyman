import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceModel } from '@shared/models/service.model';
import { environment } from '@env/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private readonly url = `${environment.apiUrl}/services`;

  constructor(private readonly http: HttpClient) { }

  getById(id: bigint): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.url}/${id}`);
  }

  validateServiceById(id: bigint): Observable<boolean> {
    return this.getById(id).pipe(
      map((Service: ServiceModel) => true),
      catchError(() => of(false))
    );
  }
}
