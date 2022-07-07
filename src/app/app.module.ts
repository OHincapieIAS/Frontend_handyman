import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';
import { ServiceTechnicianFormComponent } from './service-technician/service-technician-form/service-technician-form.component';
import { ServiceHoursCalculatorComponent } from './service-technician/service-hours-calculator/service-hours-calculator.component';
import { CalculatorFormComponent } from './service-technician/calculator-form/calculator-form.component';
import { CalculatorResultComponent } from './service-technician/calculator-result/calculator-result.component';
import { MainServiceTechnicianComponent } from './service-technician/main-service-technician/main-service-technician.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceTechnicianFormComponent,
    ServiceHoursCalculatorComponent,
    CalculatorFormComponent,
    CalculatorResultComponent,
    MainServiceTechnicianComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
