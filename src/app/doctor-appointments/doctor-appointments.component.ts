import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { Role } from '../models/role.enum';

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
      specialization: 'Cardiologist',
      hospital: 'City Hospital',
      hospitalAddress: '123 Heart St.',
      rating: 4.5,
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
      specialization: 'Dermatologist',
      hospital: 'Metro Hospital',
      hospitalAddress: '456 Skin Ave.',
      rating: 4.2,
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
      specialization: 'Pediatrician',
      hospital: 'Children’s Health Center',
      hospitalAddress: '789 Kid Lane',
      rating: 4.8,
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
      specialization: 'Neurologist',
      hospital: 'NeuroCare Clinic',
      hospitalAddress: '101 Brain Blvd.',
      rating: 4.6,
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
      specialization: 'Orthopedic Surgeon',
      hospital: 'OrthoLife Hospital',
      hospitalAddress: '202 Bone Rd.',
      rating: 4.7,
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
      specialization: 'Oncologist',
      hospital: 'Hope Cancer Center',
      hospitalAddress: '303 Cure Dr.',
      rating: 4.9,
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
      specialization: 'Gastroenterologist',
      hospital: 'Digestive Health Clinic',
      hospitalAddress: '404 Digestive Way',
      rating: 4.3,
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
      specialization: 'Pulmonologist',
      hospital: 'BreathWell Clinic',
      hospitalAddress: '505 Lung Ln.',
      rating: 4.4,
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
      specialization: 'Endocrinologist',
      hospital: 'Hormone Health Clinic',
      hospitalAddress: '606 Gland Ave.',
      rating: 4.6,
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
      specialization: 'Urologist',
      hospital: 'Men’s Health Center',
      hospitalAddress: '707 Bladder St.',
      rating: 4.1,
      yearsOfExperience: 11,
      education: 'University of Chicago Pritzker School of Medicine',
      officeHours: '9:00 AM - 5:00 PM',
      contactNumber: '321-456-9870',
      role: Role.DOCTOR,
    },
  ];

  filteredDoctors: Doctor[] = [];
  specializations: (string | undefined)[] = [];

  ngOnInit(): void {
    // Populate the specializations dropdown
    this.specializations = [
      ...new Set(this.doctors.map((d) => d.specialization)),
    ];

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
