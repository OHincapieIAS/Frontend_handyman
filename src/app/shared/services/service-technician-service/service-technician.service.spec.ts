import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ServiceTechnicianModel } from '@shared/models/service-technician.model';
import { environment } from '@env/environment';
import { serviceTechnicianMock } from '@shared/mocks/service-technician.mock';

import { ServiceTechnicianService } from './service-technician.service';

describe('ServiceTechnicianService', () => {
  let service: ServiceTechnicianService;
  let httpMock: HttpTestingController;
  const url = `${environment.apiUrl}/service-technician`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ServiceTechnicianService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('[saveServiceTechnician]', () => {
    it('When execute this request should use method GET and get serviceTechnicianMock', () => {
      const serviceTechnicianValidMock = {...serviceTechnicianMock};
      const saveServiceTechnicianUrl = url;
      const method = 'POST';
      service.saveServiceTechnician(serviceTechnicianValidMock).subscribe(
        (serviceTechncian: ServiceTechnicianModel) => {
          expect(serviceTechncian).toEqual(serviceTechnicianValidMock);
        }
      );

      const req = httpMock.expectOne(saveServiceTechnicianUrl);
      expect(req.request.method).toBe(method);
      req.flush(serviceTechnicianValidMock);
    })
  });
});
