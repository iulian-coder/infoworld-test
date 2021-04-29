import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WaitinglistComponent } from './waitinglist/waitinglist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AddPatientFormComponent } from './add-patient-form/add-patient-form.component';
import { EditPatientFormComponent } from './edit-patient-form/edit-patient-form.component';
import { PatientService } from './service/patient.service';
import { ConsultationPatientFormComponent } from './confirm-consultation-patient-form/consultation-patient-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotfoundComponent } from './not-found/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    WaitinglistComponent,
    AddPatientFormComponent,
    EditPatientFormComponent,
    ConsultationPatientFormComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [PatientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
