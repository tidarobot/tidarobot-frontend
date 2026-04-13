import { Component } from '@angular/core';
import {Auth} from '../../core/services/auth';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    RouterLink
  ],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      loginTidaro: ['', Validators.required],
      passwordTidaro: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Registration OK, wait for admin approval')
        this.router.navigate(['/login']);
      },
      error: () => alert('Registration failed')
    })
  }
}
