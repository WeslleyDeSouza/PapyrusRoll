import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthSessionFacade } from '@wes/auth';

@Component({
  selector: 'lib-auth-page-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {
  readonly signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  showPassword: boolean = false;

  constructor(protected auth: AuthSessionFacade, protected router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.signInForm.valid) return;

    this.auth.sessionSet({});
    console.log('Form submitted:', this.signInForm.value);

    this.router.navigate(['/']);
  }

  onTogglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
