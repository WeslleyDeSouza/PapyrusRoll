import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-auth-page-password-forget',
  templateUrl: './auth-password-forget.component.html',
  styleUrl: './auth-password-forget.component.css',
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  standalone: true,
})
export class AuthPasswordForgetComponent {
  currentStep = 1;

  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  steps = [
    { number: 1, label: 'Submit Email', active: true },
    { number: 2, label: 'Check Email', active: false },
    { number: 3, label: 'Create New Password', active: false },
    { number: 4, label: 'Success', active: false },
  ];

  onSubmit() {
    if (this.resetForm.valid) {
      console.log('Form submitted:', this.resetForm.value);
      // Here you would typically make an API call
    }
  }
}
