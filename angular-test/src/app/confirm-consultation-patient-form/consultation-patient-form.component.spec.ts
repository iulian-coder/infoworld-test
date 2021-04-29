import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationPatientFormComponent } from './consultation-patient-form.component';

describe('ConsultationPatientFormComponent', () => {
  let component: ConsultationPatientFormComponent;
  let fixture: ComponentFixture<ConsultationPatientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationPatientFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
