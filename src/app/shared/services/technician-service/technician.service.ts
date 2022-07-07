import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay, take, tap } from 'rxjs';
import { environment } from '@env/environment';
import { TechnicianModel } from '@shared/models/technician.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  private readonly url = `${environment.apiUrl}/technicians`;
  private currentTechnicianSubject: BehaviorSubject<TechnicianModel | undefined>;

  constructor(private readonly http: HttpClient) {
    this.currentTechnicianSubject = new BehaviorSubject<TechnicianModel | undefined>(undefined);
  }

  // get currentTechnician() {
  //   return this.currentTechnicianSubject.asObservable();
  // }

  get currentTechnicianValue(): TechnicianModel | undefined {
    return this.currentTechnicianSubject.getValue();
  }

  queryByDocument(type: string, number: string): Observable<TechnicianModel> {
    const currentValue = this.currentTechnicianSubject.value;
    if(currentValue && currentValue.documentType === type && currentValue.documentNumber === number) {
      // return this.currentTechnician.pipe(take(1));
      return of(currentValue).pipe(take(1));
    }
    let params: HttpParams = new HttpParams();
    params = params.append("type", type);
    params = params.append("number", number);
    return this.http.get<TechnicianModel>(`${this.url}/document`, { params }).pipe(
      tap((technician: TechnicianModel) => {
        this.currentTechnicianSubject.next(technician);
      }),
      shareReplay()
    );
  }

  validateTechnicianByDocument(type: string, number: string): Observable<boolean> {
    return this.queryByDocument(type, number).pipe(
      map((technician: TechnicianModel) => true),
      catchError(() => of(false))
    );
  }
  
}
