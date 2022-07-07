import { Component, OnInit } from '@angular/core';
import { CalculatorHoursResponse } from '@app/shared/models/calculator-hours.model';

@Component({
  selector: 'app-service-hours-calculator',
  templateUrl: './service-hours-calculator.component.html',
  styleUrls: ['./service-hours-calculator.component.css']
})
export class ServiceHoursCalculatorComponent implements OnInit {

  hours: CalculatorHoursResponse[];
  constructor() { }

  ngOnInit(): void {
  }

  hoursCalculated(hoursEvent: CalculatorHoursResponse[]){
    this.hours = hoursEvent;
  }
}
