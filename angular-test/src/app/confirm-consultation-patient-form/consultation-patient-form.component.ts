import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../models/Patient';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultation-patient-form',
  templateUrl: './consultation-patient-form.component.html',
  styleUrls: ['./consultation-patient-form.component.css'],
})
export class ConsultationPatientFormComponent implements OnInit {
  id: number;
  patient: Patient;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.patient = this.patientService.getPatient(this.id);

    if (this.patient === undefined) {
      this.router.navigate(['/404']);
    }
  }

  handleConfirm(id: number): void {
    this.patientService
      .deletePatientFromWaitingList(id)
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
