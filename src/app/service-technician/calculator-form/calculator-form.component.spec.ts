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
import { CalculatorFormComponent } from './calculator-form.component';

describe('CalculatorFormComponent', () => {
  let component: CalculatorFormComponent;
  let fixture: ComponentFixture<CalculatorFormComponent>;
  const notifierServiceMock = new NotifierServiceMock();
  const technicianServiceMock = new TechnicianServiceMock();
  const servicesServiceMock = new ServicesServiceMock();
  const serviceTechnicianServiceMock = new ServiceTechnicianServiceMock();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorFormComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {provide: NotifierService, useValue: notifierServiceMock},
        {provide: TechnicianService, useValue: technicianServiceMock},
        {provide: ServicesService, useValue: servicesServiceMock},
        {provide: ServiceTechnicianService, useValue: serviceTechnicianServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Form validations]', () => {
    

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

    });

    describe('Control "finalDate"', () => {
      it('When control has an empty value, should be invalid', () => {
        const finalDateControl = component.form.get('finalDate');
        const emptyValue = '';

        finalDateControl?.setValue(emptyValue);

        const required = finalDateControl?.errors? finalDateControl?.errors['required'] : false;
        expect(required).toBeTruthy();
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

});
