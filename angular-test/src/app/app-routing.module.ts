import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WaitinglistComponent } from './waitinglist/waitinglist.component';
import { AddPatientFormComponent } from './add-patient-form/add-patient-form.component';
import { EditPatientFormComponent } from './edit-patient-form/edit-patient-form.component';
import { ConsultationPatientFormComponent } from './confirm-consultation-patient-form/consultation-patient-form.component';
import { NotfoundComponent } from './not-found/notfound.component';

const routes: Routes = [
  { path: '', component: WaitinglistComponent },
  { path: 'add-patient', component: AddPatientFormComponent },
  { path: 'edit-patient/:id', component: EditPatientFormComponent },
  {
    path: 'consultation-patient/:id',
    component: ConsultationPatientFormComponent,
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
