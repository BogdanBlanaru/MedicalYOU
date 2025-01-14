import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service'; // <-- import

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

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      // If your backend expects 'username' not 'email', ensure correct usage here
      await this.auth.login(this.credentials.email, this.credentials.password);
    } catch (e) {
      this.inSubmission = false;
      this.alertMsg = 'Invalid email or password. Please try again.';
      this.alertColor = 'red';
      console.error(e);
      return;
    }

    // Hide success alert or show a quick success message
    this.alertMsg = 'Success! You are now logged in.';
    this.alertColor = 'green';

    // Optionally wait a short moment or directly close the modal
    setTimeout(() => {
      // Close the "auth" modal so user sees the main screen
      this.modal.toggleModal('auth');
    }, 500);

    this.inSubmission = false;
  }
}
