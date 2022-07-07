import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceValidator } from '@shared/validators/service.validator';
import { TechnicianDocumentValidator } from '@shared/validators/technician-document.validator';
import { NotifierService } from 'angular-notifier';
import { TechnicianService } from '@shared/services/technician-service/technician.service';
import { intervalDateTimeValidator, maxDateTimeLocalValidator, minDateTimeLocalValidator } from '@shared/validators/datetime-local.validator';
import { formatDate } from '@angular/common';
import { ServiceTechnicianModel } from '@shared/models/service-technician.model';
import { CalculatorService } from '@app/shared/services/calculator-service/calculator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CalculatorHoursResponse } from '@app/shared/models/calculator-hours.model';


@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css']
})
export class CalculatorFormComponent implements OnInit {

  private formGroup: FormGroup;
  public errorMessage: string;
  public quantityWeek: number[] = Array.from({ length: 52 }, (x, i) => i + 1);
  private initialDateAux: Date = new Date("2022/01/03 00:00:00");
  private finalDateAux: Date = new Date("2022/01/09 23:59:59");
  @Output() public productsToEmit = new EventEmitter<CalculatorHoursResponse[]>();

  constructor(private readonly formBuilder: FormBuilder,
    private readonly notifierService: NotifierService,
    private readonly technicianDocumentValidator: TechnicianDocumentValidator,
    private readonly technicianService: TechnicianService,
    private readonly calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  get technicianDocumentGroup(): FormGroup {
    return this.form.get("technicianDocument") as FormGroup;
  }

  get technicianDocumentTypeControl(): FormControl {
    return this.form.get('technicianDocument')?.get('type') as FormControl;
  }

  get technicianDocumentNumberControl(): FormControl {
    return this.form.get('technicianDocument')?.get('number') as FormControl;
  }

  get hasInvalidTechnicianDocument(): boolean {
    return this.technicianDocumentGroup.getError('notFoundDocument');
  }

  get form(): FormGroup {
    return this.formGroup;
  }

  get hasInvalidStartDate(): boolean {
    return this.form.get('startDate')?.getError('invalidDate');
  }

  get hasInvalidIntervalDate(): boolean {
    return this.form.getError('invalidIntervalDate');
  }

  get hasInvalidFinalDate(): boolean {
    return this.form.get('finaltDate')?.getError('invalidDate');
  }

  get minDate(): string {

    return formatDate(this.initialDateAux, 'yyyy-MM-ddThh:mm', 'en-US');
  }

  get maxDate(): string {
    return formatDate(this.finalDateAux, 'yyyy-MM-ddThh:mm', 'en-US');
  }

  hasError(form: FormGroup, control: string) {
    return (form.get(control)?.invalid && (form.get(control)?.dirty || !form.get(control)?.untouched));
  }

  private createFormGroup(): void {
    this.formGroup = this.formBuilder.group({

      technicianDocument: this.formBuilder.group({
        type: ['CC', Validators.required],
        number: [null, Validators.required]
      }, { asyncValidators: [this.technicianDocumentValidator], updateOn: 'blur' }),
      numberOfWeek: [null, [Validators.required]],
      idTechnician: [null],
      startDate: [null, [Validators.required]],
      finalDate: [null, [Validators.required]],
    }, { validators: intervalDateTimeValidator });

    this.formGroup.get('idTechnician')?.disable();
  }

  consultHours(serviceTechnician: ServiceTechnicianModel) {
    this.errorMessage = '';
    this.calculatorService.consultHoursWorked(serviceTechnician).subscribe({
      next: (hours: CalculatorHoursResponse[]) => {
        console.log(hours);
        this.productsToEmit.emit(hours);
        if(hours.length === 0){
          this.notifierService.notify('success', 'No hay registros del técnico en esas fechas.');
        } else {
          this.notifierService.notify('success', 'Se realizo el calculo con exito.');
        }
        
      },
      error: (err: HttpErrorResponse) => {
        const { error } = err;
        console.log(error);
        this.notifierService.notify('error', 'Lo sentimos, el registro no pudo ser creado.');
        // if(error.metaData?.error) this.errorMessage = error.metaData.error;
        if (error.status) {
          this.errorMessage = error.status;
        }
      }
    });
  }

  private resetFormGroup(): void {
    this.form.reset();
    this.form.patchValue({
      technicianDocument: {
        type: 'CC',
        number: null
      },
      numberOfWeek: null,
      idTechnician: null,
      startDate: null,
      finalDate: null
    });
  }

  setIdTechnician(): void {
    const { type, number } = this.form.value.technicianDocument;
    const currentTechnician = this.technicianService.currentTechnicianValue;
    if (currentTechnician && currentTechnician.documentType === type && currentTechnician.documentNumber === number) {
      this.form.patchValue({
        idTechnician: currentTechnician.id
      });
    }
  }

  onSubmitForm(): void {
    if (this.form.pending) {
      this.notifierService.notify('warning', 'Por favor espere a que se validen los datos ingresados.');
    } else if (this.hasInvalidTechnicianDocument) {
      this.notifierService.notify('error', 'El documento del técnico ingresado no es válido.');
    } else if (this.hasInvalidIntervalDate) {
      this.notifierService.notify('error', 'La fecha de incio debe ser menor que la fecha final.');
    } else if (this.hasInvalidFinalDate) {
      this.notifierService.notify('error', 'Los servicios no pueden ser registrados con una fecha posterior a la actual.');
    } else if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifierService.notify('error', 'Por favor llene todos los campos requeridos.');
    } else {
      this.setIdTechnician();
      this.consultHours(this.form.getRawValue());
      //this.saveServiceTechnician(this.form.getRawValue());
    }
  }

  onClickWeek(event: any) {
    this.initialDateAux = new Date("2022/01/03 00:00:00");
    this.finalDateAux = new Date("2022/01/09 23:59:59");
    const initialDate = new Date("2022/01/03 00:00:00");
    const finalDate = new Date("2022/01/09 23:59:59");
    this.initialDateAux.setDate(initialDate.getDate() + ((event - 1) * 7));
    this.finalDateAux.setDate(finalDate.getDate() + ((event - 1) * 7) );
    console.log(this.minDate);

    this.form.patchValue({
      startDate: this.minDate,
      finalDate: this.maxDate
    })
  }

  clean() {
    this.resetFormGroup();
  }
}
