import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidators } from '../validators/register-validators';

// Optional: Your role enum
enum RoleEnum {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';

  // We'll pretend the user picks the role externally (e.g., via a roleService or a radio button).
  // For demonstration, we'll just store it here:
  selectedRole: 'patient' | 'doctor' = 'patient';

  // Toggle advanced fields for doctor
  doctorFieldsOpen = false;

  // The FormGroup we'll build
  registerForm!: FormGroup;

  // If you subscribe to a service for the role, store subscription here:
  private roleSubscription!: Subscription;

  constructor(
    private auth: AuthService,
    private emailTaken: EmailTaken,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Build or rebuild the form based on selectedRole.
   */
  buildForm(): void {
    if (this.selectedRole === 'patient') {
      // PATIENT form
      this.registerForm = this.fb.group(
        {
          name: [
            '',
            [Validators.required, Validators.minLength(3)],
          ],
          email: [
            '',
            {
              validators: [Validators.required, Validators.email],
              asyncValidators: [this.emailTaken.validate],
              updateOn: 'blur', // runs async validator on blur
            },
          ],
          password: [
            '',
            [
              Validators.required,
              // Sample password pattern: min 8 chars, 1 uppercase, 1 lowercase, 1 digit
              Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
            ],
          ],
          confirm_password: ['', [Validators.required]],

          // Role stored as a string or you could use an enum
          role: [RoleEnum.PATIENT],
        },
        {
          // Attach the custom validator that compares password & confirm_password
          validators: [RegisterValidators.match('password', 'confirm_password')],
        }
      );
    } else {
      // DOCTOR form
      this.registerForm = this.fb.group(
        {
          name: [
            '',
            [Validators.required, Validators.minLength(3)],
          ],
          email: [
            '',
            {
              validators: [Validators.required, Validators.email],
              asyncValidators: [this.emailTaken.validate],
              updateOn: 'blur',
            },
          ],
          password: [
            '',
            [
              Validators.required,
              Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
            ],
          ],
          confirm_password: ['', [Validators.required]],
          role: [RoleEnum.DOCTOR],

          // DOCTOR-ONLY FIELDS with some basic validators:
          specialization: ['', [Validators.required, Validators.minLength(3)]],
          hospital: ['', [Validators.required, Validators.minLength(3)]],
          hospitalAddress: ['', [Validators.required]],
          rating: [
            null,
            [Validators.min(1), Validators.max(5)], // rating 1 to 5
          ],
          yearsOfExperience: [
            null,
            [Validators.min(0), Validators.max(50)], // 0 to 50 years
          ],
          education: ['', [Validators.required]],
          officeHours: ['', [Validators.required]],
          contactNumber: [
            '',
            [
              Validators.required,
              // just an example pattern: digits or digits with dashes
              Validators.pattern(/^[0-9-]+$/),
            ],
          ],
        },
        {
          validators: [RegisterValidators.match('password', 'confirm_password')],
        }
      );
    }
  }

  /**
   * Example method to toggle roles (could be triggered by a radio button or a role modal).
   */
  switchRole(newRole: 'patient' | 'doctor'): void {
    this.selectedRole = newRole;
    // Rebuild the form
    this.buildForm();
  }

  toggleDoctorFields(): void {
    this.doctorFieldsOpen = !this.doctorFieldsOpen;
  }

  async register(): Promise<void> {
    // Immediately show a loading alert
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    // If form is invalid, stop
    if (this.registerForm.invalid) {
      this.alertMsg = 'Please correct all form errors before submitting.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    try {
      console.log('Register Form Data:', this.registerForm.value);
      await this.auth.createUser(this.registerForm.value);
    } catch (e) {
      console.error(e);
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
    this.inSubmission = false;
  }

  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
}
