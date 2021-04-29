import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../service/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Patient } from '../models/Patient';
import { ToastrService } from 'ngx-toastr';
import { customDateValidator } from '../validators/custom-date-validator';

@Component({
  selector: 'app-add-patient-form',
  templateUrl: './add-patient-form.component.html',
  styleUrls: ['./add-patient-form.component.css'],
})
export class AddPatientFormComponent implements OnInit {
  patient: Patient;
  patientForm: FormGroup;

  today: string = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');

  Gender: any = ['M', 'F'];

  private waitingNumber: number;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  get firstName(): any {
    return this.patientForm.get('firstName');
  }

  get lastName(): any {
    return this.patientForm.get('lastName');
  }

  get cnp(): any {
    return this.patientForm.get('cnp');
  }

  get phoneNumber(): any {
    return this.patientForm.get('phoneNumber');
  }

  get dateOfBirth(): any {
    return this.patientForm.get('dateOfBirth');
  }

  get genderType(): any {
    return this.patientForm.get('genderType');
  }

  ngOnInit(): void {
    this.waitingNumber = this.patientService.getTheNextWaitingNumber();
    this.generateForm();
  }

  generateForm(): void {
    this.patientForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],

      dateOfBirth: [this.today, [Validators.required, customDateValidator()]],

      genderType: ['', [Validators.required]],
      cnp: ['', [Validators.pattern(/^[0-9]{13}$/)]],
      phoneNumber: ['', [Validators.pattern(/^\d+$/)]],
      waitingNumber: [this.waitingNumber],
    });
    this.patientForm.get('waitingNumber').disable();
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      return;
    }
    this.patient = this.patientForm.value;
    this.patient.waitingNumber = this.waitingNumber;

    this.patientService
      .addPatientToWaitingList(this.patient)
      .then((res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.patientForm.reset();
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Something went wrong');
        }
      })
      .catch((e) => {
        console.log(e);
        this.toastr.error('Something went wrong');
      });
  }
}
