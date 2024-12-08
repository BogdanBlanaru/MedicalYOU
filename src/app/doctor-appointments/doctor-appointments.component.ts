import { Component, OnInit } from '@angular/core';
import { Doctor, Role } from '../models/doctor.model';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css'],
})
export class DoctorAppointmentsComponent implements OnInit {
  doctors: Doctor[] = [
    {
      name: 'Dr. John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
      patients: ['Patient 1', 'Patient 2'],
      specialization: 'Cardiologist',
      rating: 4.5,
      hospital: 'City Hospital',
      yearsOfExperience: 15,
      education: 'Harvard Medical School',
      officeHours: '9:00 AM - 5:00 PM',
      contactNumber: '123-456-7890',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. Jane Smith',
      email: 'jane.smith@example.com',
      password: 'securePassword456',
      patients: ['Patient 3'],
      specialization: 'Dermatologist',
      rating: 4.2,
      hospital: 'Metro Hospital',
      yearsOfExperience: 10,
      education: 'Stanford University',
      officeHours: '10:00 AM - 6:00 PM',
      contactNumber: '987-654-3210',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. Alice Brown',
      email: 'alice.brown@example.com',
      password: 'securePassword789',
      patients: ['Patient 4', 'Patient 5', 'Patient 6'],
      specialization: 'Pediatrician',
      rating: 4.8,
      hospital: 'Children’s Health Center',
      yearsOfExperience: 12,
      education: 'Johns Hopkins University',
      officeHours: '8:00 AM - 3:00 PM',
      contactNumber: '456-123-7890',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. Mike Johnson',
      email: 'mike.johnson@example.com',
      password: 'securePassword101',
      patients: ['Patient 7', 'Patient 8'],
      specialization: 'Neurologist',
      rating: 4.6,
      hospital: 'NeuroCare Clinic',
      yearsOfExperience: 20,
      education: 'University of Oxford',
      officeHours: '8:00 AM - 2:00 PM',
      contactNumber: '789-654-1230',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. Emily White',
      email: 'emily.white@example.com',
      password: 'securePassword202',
      patients: ['Patient 9', 'Patient 10'],
      specialization: 'Orthopedic Surgeon',
      rating: 4.7,
      hospital: 'OrthoLife Hospital',
      yearsOfExperience: 18,
      education: 'Yale School of Medicine',
      officeHours: '9:00 AM - 4:00 PM',
      contactNumber: '321-654-9870',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. Robert Green',
      email: 'robert.green@example.com',
      password: 'securePassword303',
      patients: ['Patient 11', 'Patient 12', 'Patient 13'],
      specialization: 'Oncologist',
      rating: 4.9,
      hospital: 'Hope Cancer Center',
      yearsOfExperience: 25,
      education: 'University of Cambridge',
      officeHours: '7:00 AM - 3:00 PM',
      contactNumber: '123-789-4560',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. Laura Adams',
      email: 'laura.adams@example.com',
      password: 'securePassword404',
      patients: ['Patient 14'],
      specialization: 'Gastroenterologist',
      rating: 4.3,
      hospital: 'Digestive Health Clinic',
      yearsOfExperience: 16,
      education: 'University of California, San Francisco',
      officeHours: '10:00 AM - 5:00 PM',
      contactNumber: '789-321-6540',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. David Brown',
      email: 'david.brown@example.com',
      password: 'securePassword505',
      patients: ['Patient 15', 'Patient 16'],
      specialization: 'Pulmonologist',
      rating: 4.4,
      hospital: 'BreathWell Clinic',
      yearsOfExperience: 13,
      education: 'Columbia University Medical Center',
      officeHours: '9:00 AM - 3:00 PM',
      contactNumber: '456-987-1230',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. Sarah Miller',
      email: 'sarah.miller@example.com',
      password: 'securePassword606',
      patients: ['Patient 17', 'Patient 18', 'Patient 19'],
      specialization: 'Endocrinologist',
      rating: 4.6,
      hospital: 'Hormone Health Clinic',
      yearsOfExperience: 14,
      education: 'University of Michigan Medical School',
      officeHours: '8:30 AM - 3:30 PM',
      contactNumber: '987-321-4560',
      role: Role.DOCTOR,
    },
    {
      name: 'Dr. Kevin Turner',
      email: 'kevin.turner@example.com',
      password: 'securePassword707',
      patients: ['Patient 20', 'Patient 21'],
      specialization: 'Urologist',
      rating: 4.1,
      hospital: 'Men’s Health Center',
      yearsOfExperience: 11,
      education: 'University of Chicago Pritzker School of Medicine',
      officeHours: '9:00 AM - 5:00 PM',
      contactNumber: '321-456-9870',
      role: Role.DOCTOR,
    },
  ];  

  filteredDoctors: Doctor[] = [];
  specializations: string[] = [];

  ngOnInit(): void {
    // Populate the specializations filter
    this.specializations = [...new Set(this.doctors.map((d) => d.specialization))];

    // Show all doctors initially
    this.filteredDoctors = this.doctors;
  }

  onSpecializationChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const specialization = selectElement.value;

    if (specialization === 'All') {
      this.filteredDoctors = this.doctors;
    } else {
      this.filteredDoctors = this.doctors.filter(
        (doctor) => doctor.specialization === specialization
      );
    }
  }
}
