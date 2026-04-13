import { Component } from '@angular/core';
import {Auth} from '../../core/services/auth';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AuthResponse} from '../../core/models/auth-response';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatButton,
    RouterLink,
    MatIcon
  ],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: AuthResponse) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert(('Login failed.')),
      }
    )
  }


}
