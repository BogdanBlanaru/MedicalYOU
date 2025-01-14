import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { EmailTaken } from './validators/email-taken';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AuthModalComponent,
    LoginComponent,
    RegisterComponent,
    RoleModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,      // <-- Provide the interceptor
      useClass: AuthInterceptor,
      multi: true                      // <-- This is important (multi: true)
    },
    EmailTaken
  ],
  exports: [
    AuthModalComponent,
    RoleModalComponent
  ]
})
export class UserModule { }
