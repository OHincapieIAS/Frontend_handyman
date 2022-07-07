import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceValidator } from '@shared/validators/service.validator';
import { TechnicianDocumentValidator } from '@shared/validators/technician-document.validator';
import { NotifierService } from 'angular-notifier';
import { TechnicianService } from '@shared/services/technician-service/technician.service';
import { intervalDateTimeValidator, maxDateTimeLocalValidator, minDateTimeLocalValidator } from '@shared/validators/datetime-local.validator';
import { formatDate } from '@angular/common';
import { ServiceTechnicianModel } from '@shared/models/service-technician.model';
import { ServiceTechnicianService } from '@shared/services/service-technician-service/service-technician.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-service-technician-form',
  templateUrl: './service-technician-form.component.html',
  styleUrls: ['./service-technician-form.component.css']
})
export class ServiceTechnicianFormComponent implements OnInit {

  private formGroup: FormGroup;
  public errorMessage: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notifierService: NotifierService,
    private readonly technicianDocumentValidator: TechnicianDocumentValidator, 
    private readonly technicianService: TechnicianService,
    private readonly serviceValidator: ServiceValidator,
    private readonly serviceTechnicianService: ServiceTechnicianService
  ) { }

  get form(): FormGroup {
    return this.formGroup;
  }

  get technicianDocumentGroup(): FormGroup {
    return this.form.get("technicianDocument") as FormGroup;
  }

  get hasInvalidTechnicianDocument(): boolean {
    return this.technicianDocumentGroup.getError('notFoundDocument');
  }

  get technicianDocumentTypeControl(): FormControl {
    return this.form.get('technicianDocument')?.get('type') as FormControl;
  }
  
  get technicianDocumentNumberControl(): FormControl {
    return this.form.get('technicianDocument')?.get('number') as FormControl;
  }

  get hasInvalidIdService(): boolean {
    return this.form.get('idService')?.getError('notFoundService');
  }

  get minDate(): string {
    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return formatDate(lastWeek, 'yyyy-MM-ddThh:mm', 'en-US');
  }

  get maxDate(): string {
    return formatDate(Date.now(), 'yyyy-MM-ddThh:mm', 'en-US');
  }

  get hasInvalidStartDate(): boolean {
    return this.form.get('startDate')?.getError('invalidDate');
  }

  get hasInvalidFinalDate(): boolean {
    return this.form.get('finaltDate')?.getError('invalidDate');
  }

  get hasInvalidIntervalDate(): boolean {
    return this.form.getError('invalidIntervalDate');
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  hasError(form: FormGroup, control: string) {
    return (form.get(control)?.invalid && (form.get(control)?.dirty || !form.get(control)?.untouched));
  }

  private createFormGroup(): void {
    const today = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(today.getDate()-7);
    
    this.formGroup = this.formBuilder.group({
      idService: [null, {validators: [Validators.required], asyncValidators: [this.serviceValidator.validate.bind(this.serviceValidator)], updateOn: 'blur' }],
      technicianDocument: this.formBuilder.group({
        type:  ['CC', Validators.required],
        number: [null, Validators.required]
      }, { asyncValidators: [this.technicianDocumentValidator], updateOn: 'blur' }),
      idTechnician: [null],
      startDate: [null, [Validators.required, minDateTimeLocalValidator(lastWeek), maxDateTimeLocalValidator(today)]],
      finalDate: [null, [Validators.required, minDateTimeLocalValidator(lastWeek), maxDateTimeLocalValidator(today)]],
    }, { validators: intervalDateTimeValidator });
    
    this.formGroup.get('idTechnician')?.disable();
  }

  private resetFormGroup(): void {
    this.form.reset();
    this.form.patchValue({
      idService: null,
      technicianDocument: {
        type: 'CC',
        number: null
      },
      idTechnician: null,
      startDate: null,
      finalDate: null
    });
  }

  setIdTechnician(): void {
    const { type, number } = this.form.value.technicianDocument;
    const currentTechnician = this.technicianService.currentTechnicianValue;
    if(currentTechnician && currentTechnician.documentType === type && currentTechnician.documentNumber === number) {
      this.form.patchValue({
        idTechnician: currentTechnician.id
      });
    }
  }

  saveServiceTechnician(serviceTechnician: ServiceTechnicianModel) {
    this.errorMessage = '';
    this.serviceTechnicianService.saveServiceTechnician(serviceTechnician).subscribe({
      next: (serviceTech : ServiceTechnicianModel) => {
        this.notifierService.notify('success', 'El registro ha sido creado exitosamente.');
        this.resetFormGroup();
      },
      error: (err: HttpErrorResponse)=>{
        const { error } = err;
        console.log(error);
        this.notifierService.notify('error', 'Lo sentimos, el registro no pudo ser creado.');
        // if(error.metaData?.error) this.errorMessage = error.metaData.error;
        if(error.status) {
          this.errorMessage = error.status;
        }
      }
    });
  }

  onSubmitForm(): void {
    if(this.form.pending) {
      this.notifierService.notify('warning', 'Por favor espere a que se validen los datos ingresados.');
    } else if(this.hasInvalidTechnicianDocument){
      this.notifierService.notify('error', 'El documento del técnico ingresado no es válido.');
    } else if(this.hasInvalidIdService){
      this.notifierService.notify('error', 'El Identificador del servicio ingresado no es válido.');
    } else if(this.hasInvalidIntervalDate){
      this.notifierService.notify('error', 'La fecha de incio debe ser menor que la fecha final.');
    } else if(this.hasInvalidStartDate){
      this.notifierService.notify('error', 'Los servicios solo puede ser registrados desde 1 semana atrás.');
    } else if(this.hasInvalidFinalDate){
      this.notifierService.notify('error', 'Los servicios no pueden ser registrados con una fecha posterior a la actual.');
    } else if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifierService.notify('error', 'Por favor llene todos los campos requeridos.');
    } else {
      this.setIdTechnician();
      this.saveServiceTechnician(this.form.getRawValue());
    }
  }

}
