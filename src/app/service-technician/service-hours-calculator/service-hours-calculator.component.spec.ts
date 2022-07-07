import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHoursCalculatorComponent } from './service-hours-calculator.component';

describe('ServiceHoursCalculatorComponent', () => {
  let component: ServiceHoursCalculatorComponent;
  let fixture: ComponentFixture<ServiceHoursCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceHoursCalculatorComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceHoursCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
