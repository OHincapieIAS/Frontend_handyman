import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TechnicianModel } from '@shared/models/technician.model';
import { environment } from '@env/environment';
import { technicianMock } from '@shared/mocks/technician.mock';

import { TechnicianService } from './technician.service';

describe('TechnicianService', () => {
  let service: TechnicianService;
  let httpMock: HttpTestingController;
  const url = `${environment.apiUrl}/technicians`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TechnicianService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('[queryByDocument]', () => {
    it('When execute this request should use method GET and get technicianMock', () => {
      const technicianValidMock = {...technicianMock};
      const {documentType, documentNumber} = technicianValidMock;
      const queryByDocumentUrl = `${url}/document?type=${documentType}&number=${documentNumber}`;
      const method = 'GET';
      service.queryByDocument(documentType, documentNumber).subscribe(
        (technician: TechnicianModel) => {
          expect(technician).toEqual(technicianValidMock);
        }
      );

      const req = httpMock.expectOne(queryByDocumentUrl);
      expect(req.request.method).toBe(method);
      req.flush(technicianValidMock);
    })
  });

  describe('[validateTechnicianByDocument]', () => {
    it('When execute this request should use method GET and get true', () => {
      const technicianValidMock = {...technicianMock};
      const {documentType, documentNumber} = technicianValidMock;
      const validateTechnicianByDocumentUrl = `${url}/document?type=${documentType}&number=${documentNumber}`;
      const method = 'GET';
      service.validateTechnicianByDocument(documentType, documentNumber).subscribe(
        (exist: boolean) => {
          expect(exist).toBeTrue();
        }
      );

      const req = httpMock.expectOne(validateTechnicianByDocumentUrl);
      expect(req.request.method).toBe(method);
      req.flush(technicianValidMock);
    })
  });
});
