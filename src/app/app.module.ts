import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ClipsListComponent } from './clips-list/clips-list.component';
import { FbTimestampPipe } from './pipes/fb-timestamp.pipe';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { VirtualAssistantComponent } from './virtual-assistant/virtual-assistant.component';
import { IntroductionComponent } from './virtual-assistant/introduction/introduction.component';
import { PatientComponent } from './virtual-assistant/patient/patient.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { RegionsComponent } from './virtual-assistant/regions/regions.component';
import { InterviewComponent } from './virtual-assistant/interview/interview.component';
import { ResultsComponent } from './virtual-assistant/results/results.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent,
    ClipsListComponent,
    FbTimestampPipe,
    FooterComponent,
    VirtualAssistantComponent,
    IntroductionComponent,
    PatientComponent,
    SymptomsComponent,
    RegionsComponent,
    InterviewComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}