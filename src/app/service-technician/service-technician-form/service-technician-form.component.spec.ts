import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { serviceTechnicianEmptyFormValueMock, serviceTechnicianValidFormValueMock } from '@shared/mocks/service-technician.mock';
import { serviceMock } from '@shared/mocks/service.mock';
import { NotifierServiceMock } from '@shared/mocks/services-mocks/notifier-service.mock';
import { ServiceTechnicianServiceMock } from '@shared/mocks/services-mocks/service-technician-service.mock';
import { ServicesServiceMock } from '@shared/mocks/services-mocks/services-service.mock';
import { TechnicianServiceMock } from '@shared/mocks/services-mocks/technician-service.mock';
import { technicianMock } from '@shared/mocks/technician.mock';
import { ServiceTechnicianService } from '@shared/services/service-technician-service/service-technician.service';
import { ServicesService } from '@shared/services/services-service/services.service';
import { TechnicianService } from '@shared/services/technician-service/technician.service';
import { NotifierService } from 'angular-notifier';

import { ServiceTechnicianFormComponent } from './service-technician-form.component';

describe('ServiceTechnicianFormComponent', () => {
  let component: ServiceTechnicianFormComponent;
  let fixture: ComponentFixture<ServiceTechnicianFormComponent>;
  const notifierServiceMock = new NotifierServiceMock();
  const technicianServiceMock = new TechnicianServiceMock();
  const servicesServiceMock = new ServicesServiceMock();
  const serviceTechnicianServiceMock = new ServiceTechnicianServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTechnicianFormComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {provide: NotifierService, useValue: notifierServiceMock},
        {provide: TechnicianService, useValue: technicianServiceMock},
        {provide: ServicesService, useValue: servicesServiceMock},
        {provide: ServiceTechnicianService, useValue: serviceTechnicianServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceTechnicianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Form validations]', () => {
    describe('Control "idService"', () => {
      it('When control has an empty value, should be invalid', () => {
        const idServiceControl = component.form.get('idService');
        const emptyValue = '';

        idServiceControl?.setValue(emptyValue);

        const required = idServiceControl?.errors? idServiceControl?.errors['required'] : false;
        expect(required).toBeTruthy();
      });

      it('When the control has a value that does not exist, it must be invalid', fakeAsync(() => {
        const idServiceControl = component.form.get('idService');
        // idServiceControl?.clearAsyncValidators();
        // idServiceControl?.setAsyncValidators(serviceValidatorMock.bind(this));
        const invalidValue = 123n;
        
        idServiceControl?.setValue(invalidValue);
        tick();
        const notFoundService = idServiceControl?.errors? idServiceControl?.errors['notFoundService'] : false;
        expect(notFoundService).toBeTruthy();
      }));

      it('When the control has a service that exist, it must be valid', fakeAsync(() => {
        const idServiceControl = component.form.get('idService');
        // idServiceControl?.clearAsyncValidators();
        // idServiceControl?.setAsyncValidators(serviceValidatorMock.bind(this));
        const validValue = serviceMock.id;
        
        idServiceControl?.setValue(validValue);
        tick();

        const notFoundService = idServiceControl?.errors? idServiceControl?.errors['notFoundService'] : false;
        expect(notFoundService).toBeFalse();
      }));
    });

    describe('Control "TechnicianDocument"', () => {
      it('When Technician Document Type control has an empty value, should be invalid', () => {
        const technicianDocumentControl = component.form.get('technicianDocument');
        const technicianDocumentTypeControl = technicianDocumentControl?.get('type');
        const emptyValue = '';

        technicianDocumentTypeControl?.setValue(emptyValue);

        const required = technicianDocumentTypeControl?.errors? technicianDocumentTypeControl?.errors['required'] : false;
        expect(required).toBeTruthy();
      });
      
      it('When Technician Document Number control has an empty value, should be invalid', () => {
        const technicianDocumentControl = component.form.get('technicianDocument');
        const technicianDocumentNumberControl = technicianDocumentControl?.get('number');
        const emptyValue = '';

        technicianDocumentNumberControl?.setValue(emptyValue);

        const required = technicianDocumentNumberControl?.errors? technicianDocumentNumberControl?.errors['required'] : false;
        expect(required).toBeTruthy();
      });

      it('When the control has a value that does not exist, it must be invalid', fakeAsync(() => {
        const technicianDocumentControl = component.form.get('technicianDocument');
        const technicianDocumentNumberControl = technicianDocumentControl?.get('number');
        // technicianDocumentControl?.clearAsyncValidators();
        // technicianDocumentControl?.setAsyncValidators(technicianDocumentValidatorMock.bind(this));
        const invalidValue = '123987';
        
        technicianDocumentNumberControl?.setValue(invalidValue);
        tick();

        const notFoundDocument = technicianDocumentControl?.errors? technicianDocumentControl?.errors['notFoundDocument'] : false;
        expect(notFoundDocument).toBeTruthy();
      }));

      it('When the control has a service that exist, it must be valid', fakeAsync(() => {
        const technicianDocumentControl = component.form.get('technicianDocument');
        const technicianDocumentTypeControl = technicianDocumentControl?.get('type');
        const technicianDocumentNumberControl = technicianDocumentControl?.get('number');
        // technicianDocumentControl?.clearAsyncValidators();
        // technicianDocumentControl?.setAsyncValidators(technicianDocumentValidatorMock.bind(this));
        const validValueType = technicianMock.documentType;
        const validValueNumber = technicianMock.documentNumber;
        
        technicianDocumentTypeControl?.setValue(validValueType);
        technicianDocumentNumberControl?.setValue(validValueNumber);
        tick();

        const notFoundDocument = technicianDocumentControl?.errors? technicianDocumentControl?.errors['notFoundDocument'] : false;
        expect(notFoundDocument).toBeFalse();
      }));
    });

    describe('Control "startDate"', () => {
      it('When control has an empty value, should be invalid', () => {
        const startDateControl = component.form.get('startDate');
        const emptyValue = '';

        startDateControl?.setValue(emptyValue);

        const required = startDateControl?.errors? startDateControl?.errors['required'] : false;
        expect(required).toBeTruthy();
      });

      it('When the control has a has a date older than a week, it must be invalid', () => {
        const startDateControl = component.form.get('startDate');
        const invalidValue = new Date();
        invalidValue.setDate(invalidValue.getDate()-9);
        
        startDateControl?.setValue(invalidValue);
        
        const invalidDate = startDateControl?.errors? startDateControl?.errors['invalidDate'] : false;
        expect(invalidDate).toBeTruthy();
      });

      it('When the control has a has a date after today, it must be invalid', () => {
        const startDateControl = component.form.get('startDate');
        const invalidValue = new Date();
        invalidValue.setDate(invalidValue.getDate()+2);
        
        startDateControl?.setValue(invalidValue);
        
        const invalidDate = startDateControl?.errors? startDateControl?.errors['invalidDate'] : false;
        expect(invalidDate).toBeTruthy();
      });

      it('When the control has a valid date, it must be valid', () => {
        const startDateControl = component.form.get('startDate');
        const validValue = new Date();
        validValue.setDate(validValue.getDate()-3);
        
        startDateControl?.setValue(validValue);

        const invalidDate = startDateControl?.errors? startDateControl?.errors['invalidDate'] : false;
        expect(invalidDate).toBeFalse();
      });
    });

    describe('Control "finalDate"', () => {
      it('When control has an empty value, should be invalid', () => {
        const finalDateControl = component.form.get('finalDate');
        const emptyValue = '';

        finalDateControl?.setValue(emptyValue);

        const required = finalDateControl?.errors? finalDateControl?.errors['required'] : false;
        expect(required).toBeTruthy();
      });

      it('When the control has a has a date older than a week, it must be invalid', () => {
        const finalDateControl = component.form.get('finalDate');
        const invalidValue = new Date();
        invalidValue.setDate(invalidValue.getDate()-9);
        
        finalDateControl?.setValue(invalidValue);
        
        const invalidDate = finalDateControl?.errors? finalDateControl?.errors['invalidDate'] : false;
        expect(invalidDate).toBeTruthy();
      });

      it('When the control has a has a date after today, it must be invalid', () => {
        const finalDateControl = component.form.get('finalDate');
        const invalidValue = new Date();
        invalidValue.setDate(invalidValue.getDate()+2);
        
        finalDateControl?.setValue(invalidValue);
        
        const invalidDate = finalDateControl?.errors? finalDateControl?.errors['invalidDate'] : false;
        expect(invalidDate).toBeTruthy();
      });

      it('When the control has a valid date, it must be valid', () => {
        const finalDateControl = component.form.get('finalDate');
        const validValue = new Date();
        validValue.setDate(validValue.getDate()-3);
        
        finalDateControl?.setValue(validValue);

        const invalidDate = finalDateControl?.errors? finalDateControl?.errors['invalidDate'] : false;
        expect(invalidDate).toBeFalse();
      });
    });

    describe('Cross Field dates', () => {
      it('When select invalid interval date, form must be invalid', () => {
        const startDateControl = component.form.get('startDate');
        const finalDateControl = component.form.get('finalDate');
        const startDateValue = new Date();
        startDateValue.setDate(startDateValue.getDate()-2);
        const finalDateValue = new Date();
        finalDateValue.setDate(finalDateValue.getDate()-4);

        startDateControl?.setValue(startDateValue);
        finalDateControl?.setValue(finalDateValue);

        const invalidIntervalDate = component.form?.errors? component.form?.errors['invalidIntervalDate'] : false;
        expect(invalidIntervalDate).toBeTruthy();
      });

      it('When select valid interval date, form must be valid', () => {
        const startDateControl = component.form.get('startDate');
        const finalDateControl = component.form.get('finalDate');
        const startDateValue = new Date();
        startDateValue.setDate(startDateValue.getDate()-4);
        const finalDateValue = new Date();
        finalDateValue.setDate(finalDateValue.getDate()-2);

        startDateControl?.setValue(startDateValue);
        finalDateControl?.setValue(finalDateValue);

        const invalidIntervalDate = component.form?.errors? component.form?.errors['invalidIntervalDate'] : false;
        expect(invalidIntervalDate).toBeFalse();
      });
    });
  });

  describe('[Method onSubmitForm]', () => {
    it('When set empty value, must be invalid Form', () => {
      const spySetIdTechnician = spyOn(component, 'setIdTechnician');
      const spySaveServiceTechnician = spyOn(component, 'saveServiceTechnician');
      const spyNotifierNotify = notifierServiceMock.notify;
      const serviceTechnicianInvalidMock = {...serviceTechnicianEmptyFormValueMock};

      component.form.setValue(serviceTechnicianInvalidMock);
      component.onSubmitForm();

      expect(spyNotifierNotify).toHaveBeenCalledWith('error', 'Por favor llene todos los campos requeridos.');
      expect(spySetIdTechnician).not.toHaveBeenCalled();      
      expect(spySaveServiceTechnician).not.toHaveBeenCalled();      
    });

    it('When set valid value, must be valid and submit form', () => {
      const spySetIdTechnician = spyOn(component, 'setIdTechnician');
      const spySaveServiceTechnician = spyOn(component, 'saveServiceTechnician');
      const serviceTechnicianValidMock = {...serviceTechnicianValidFormValueMock};

      component.form.setValue(serviceTechnicianValidMock);      
      component.onSubmitForm();

      expect(spySetIdTechnician).toHaveBeenCalled();      
      expect(spySaveServiceTechnician).toHaveBeenCalledWith(serviceTechnicianValidMock);      
    });
  });
});
