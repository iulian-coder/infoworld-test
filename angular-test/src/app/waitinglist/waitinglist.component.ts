import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { Patient } from '../models/Patient';

@Component({
  selector: 'app-waitinglist',
  templateUrl: './waitinglist.component.html',
  styleUrls: ['./waitinglist.component.css'],
})
export class WaitinglistComponent implements OnInit {
  public listPatientsTableData: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.patientService.getPatientsWaitingList().then((item) => {
      this.listPatientsTableData = item;
    });
  }
}
