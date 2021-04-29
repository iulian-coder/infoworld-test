import { Injectable } from '@angular/core';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private waitingListNumber: number[] = [0];
  private patientsWaitingList: Patient[] = [];

  async getPatientsWaitingList(): Promise<Patient[]> {
    try {
      const response = Promise.resolve(this.patientsWaitingList);
      return await response;
    } catch (e) {
      console.error(e);
    }
  }

  getPatient(id: number): Patient {
    return this.patientsWaitingList[id];
  }

  getTheNextWaitingNumber(): number {
    const max = Math.max(...this.waitingListNumber);
    return max + 1;
  }

  async addPatientToWaitingList(newPatient: Patient): Promise<any> {
    try {
      const promiseAddPatient = Promise.resolve(
        this.patientsWaitingList.push(newPatient)
      );
      const promiseAddWaitingNumber = Promise.resolve(
        this.waitingListNumber.push(newPatient.waitingNumber)
      );

      const response = Promise.all([
        promiseAddPatient,
        promiseAddWaitingNumber,
      ]).then(() => {
        return { success: true, message: 'Patient add to the waiting list' };
      });

      return await response;
    } catch (e) {
      console.log(e);
    }
  }

  async editPatientFromWaitingList(patient: Patient, id: number): Promise<any> {
    try {
      const patientPromise = Promise.resolve(
        (this.patientsWaitingList[id] = patient)
      );

      const response = patientPromise.then(() => {
        return { success: true, message: 'Patient updated' };
      });
      return await response;
    } catch (e) {
      console.log(e);
    }
  }

  async deletePatientFromWaitingList(id: number): Promise<any> {
    try {
      const deletePatientPromise = Promise.resolve(
        (this.patientsWaitingList = this.patientsWaitingList.filter(
          (item, key: number) => key !== id
        ))
      );
      const response = deletePatientPromise.then(() => {
        return {
          success: true,
          message: 'Patient deleted from waiting list',
        };
      });
      return await response;
    } catch (e) {
      console.log(e);
    }
  }
}
