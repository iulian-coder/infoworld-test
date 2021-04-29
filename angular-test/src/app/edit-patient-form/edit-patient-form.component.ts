import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../models/Patient';
import { PatientService } from '../service/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { customDateValidator } from '../validators/custom-date-validator';

@Component({
  selector: 'app-edit-patient-form',
  templateUrl: './edit-patient-form.component.html',
  styleUrls: ['./edit-patient-form.component.css'],
})
export class EditPatientFormComponent implements OnInit {
  id: number;
  public patient: Patient;
  patientForm: FormGroup;

  Gender: any = ['M', 'F'];
  private waitingNumber: number;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private fb: FormBuilder,
    private router: Router,
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
    this.id = +this.route.snapshot.paramMap.get('id');
    this.patient = this.patientService.getPatient(this.id);

    if (this.patient === undefined) {
      this.router.navigate(['/404']);
    }
    this.waitingNumber = this.patient.waitingNumber;
    this.generateForm();
  }

  generateForm(): void {
    this.patientForm = this.fb.group({
      firstName: [
        this.patient.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        this.patient.lastName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],

      dateOfBirth: [
        this.patient.dateOfBirth,
        [Validators.required, customDateValidator()],
      ],

      genderType: [this.patient.genderType, [Validators.required]],
      cnp: [this.patient.cnp, [Validators.pattern('^[0-9]{13}$')]],
      phoneNumber: [this.patient.phoneNumber, [Validators.pattern(/^\d+$/)]],
      waitingNumber: [this.patient.waitingNumber],
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
      .editPatientFromWaitingList(this.patient, this.id)
      .then((res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Something went wrong');
        }
      })
      .catch((e) => {
        this.toastr.error('Something went wrong');
        console.log(e);
      });
  }
}
