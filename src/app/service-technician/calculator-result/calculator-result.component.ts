import { Component, Input, OnInit } from '@angular/core';
import { CalculatorHoursResponse } from '@app/shared/models/calculator-hours.model';

@Component({
  selector: 'app-calculator-result',
  templateUrl: './calculator-result.component.html',
  styleUrls: ['./calculator-result.component.css']
})
export class CalculatorResultComponent implements OnInit {

  @Input() hours: CalculatorHoursResponse[];
  constructor() { }

  ngOnInit(): void { }

}
