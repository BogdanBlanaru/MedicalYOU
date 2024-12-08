export enum Role {
    DOCTOR = 'DOCTOR',
  }
  
  export interface Doctor {
    name: string;
    email: string;
    password: string; 
    patients: string[]; 
    specialization: string;
    rating: number; 
    hospital: string;
    yearsOfExperience: number;
    education: string;
    officeHours: string;
    contactNumber: string;
    role: Role;
  }
  