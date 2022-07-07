import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ServiceModel } from '@shared/models/service.model';
import { environment } from '@env/environment';
import { serviceMock } from '@shared/mocks/service.mock';

import { ServicesService } from './services.service';

describe('ServicesService', () => {
  let service: ServicesService;
  let httpMock: HttpTestingController;
  const url = `${environment.apiUrl}/services`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('[getById]', () => {
    it('When execute this request should use method GET and get serviceMock', () => {
      const serviceValidMock = {...serviceMock};
      const getByIdUrl = `${url}/${serviceValidMock.id}`;
      const method = 'GET';
      service.getById(serviceValidMock.id).subscribe(
        (service: ServiceModel) => {
          expect(service).toEqual(serviceValidMock);
        }
      );

      const req = httpMock.expectOne(getByIdUrl);
      expect(req.request.method).toBe(method);
      req.flush(serviceValidMock);
    })
  });

  describe('[validateServiceById]', () => {
    it('When execute this request should use method GET and get true', () => {
      const serviceValidMock = {...serviceMock};
      const validateServiceByIdUrl = `${url}/${serviceValidMock.id}`;
      const method = 'GET';
      service.validateServiceById(serviceValidMock.id).subscribe(
        (exist: boolean) => {
          expect(exist).toBeTrue();
        }
      );

      const req = httpMock.expectOne(validateServiceByIdUrl);
      expect(req.request.method).toBe(method);
      req.flush(serviceValidMock);
    })
  });
});
