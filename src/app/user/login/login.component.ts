import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';  // <-- import for NgForm

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };
  showAlert = false;
  alertMsg = 'Please wait! We are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(
    private auth: AuthService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {}

  // Accept the template form as a parameter
  async login(loginForm: NgForm) {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.login(this.credentials.email, this.credentials.password);
    } catch (e) {
      this.inSubmission = false;
      this.alertMsg = 'Invalid email or password. Please try again.';
      this.alertColor = 'red';
      console.error(e);
      return;
    }

    // Optionally show a quick success message
    this.alertMsg = 'Success! You are now logged in.';
    this.alertColor = 'green';
    this.inSubmission = false;

    // Reset the form fields + validation state
    loginForm.resetForm();

    // Close the "auth" modal
    setTimeout(() => {
      this.modal.toggleModal('auth');
      this.showAlert = false;
    }, 800);
  }
}
