import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PacientGuard } from './guards/pacient.guard';
import { VirtualAssistantComponent } from './virtual-assistant/virtual-assistant.component';
import { IntroductionComponent } from './virtual-assistant/introduction/introduction.component';
import { PatientComponent } from './virtual-assistant/patient/patient.component';
import { SymptomsComponent } from './virtual-assistant/symptoms/symptoms.component';
import { RegionsComponent } from './virtual-assistant/regions/regions.component';
import { InterviewComponent } from './virtual-assistant/interview/interview.component';
import { ResultsComponent } from './virtual-assistant/results/results.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { DoctorsPatientsComponent } from './doctors-patients/doctors-patients.component';
import { DoctorGuard } from './guards/doctor.guard';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about', // example.com/about
    component: AboutComponent,
  },
  {
    path: 'video-call',
    component: VideoCallComponent,
    canActivate: [PacientGuard], // Protect this route for patients only
  },
  {
    path: 'virtual-assistant',
    component: VirtualAssistantComponent,
    canActivate: [PacientGuard], // Protect this route
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
      {
        path: 'introduction',
        component: IntroductionComponent,
      },
      {
        path: 'patient',
        component: PatientComponent,
      },
      {
        path: 'symptoms',
        component: SymptomsComponent,
      },
      {
        path: 'regions',
        component: RegionsComponent,
      },
      {
        path: 'interview',
        component: InterviewComponent,
      },
      {
        path: 'results',
        component: ResultsComponent,
      },
      
    ],
  },
  {
    path: 'patient-history', 
    component: PatientHistoryComponent,
    canActivate: [PacientGuard],
  },
  {
    path: 'book-appointment',
    component: DoctorAppointmentsComponent,
    canActivate: [PacientGuard],
  },
  {
    path: 'doctor-patients',
    component: DoctorsPatientsComponent,
    canActivate: [DoctorGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
