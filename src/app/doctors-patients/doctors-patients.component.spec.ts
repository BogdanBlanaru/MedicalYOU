import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsPatientsComponent } from './doctors-patients.component';

describe('DoctorsPatientsComponent', () => {
  let component: DoctorsPatientsComponent;
  let fixture: ComponentFixture<DoctorsPatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsPatientsComponent]
    });
    fixture = TestBed.createComponent(DoctorsPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
