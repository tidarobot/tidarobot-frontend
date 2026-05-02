import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UserService } from '../../core/services/user.service';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard, MatCardContent,
    MatButton,
    MatFormField, MatLabel, MatInput
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  protected form: FormGroup;
  protected error = signal<string | null>(null);
  protected success = signal<string | null>(null);
  protected username: string | null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    protected auth: Auth
  ) {
    this.username = auth.getUsername();
    this.form = this.fb.group({
      email: [''],
      password: [''],
      loginTidaro: [''],
      passwordTidaro: ['']
    });
  }

  save() {
    const { email, password, loginTidaro, passwordTidaro } = this.form.value;
    const data: { email?: string; password?: string; loginTidaro?: string; passwordTidaro?: string } = {};
    if (email) data.email = email;
    if (password) data.password = password;
    if (loginTidaro) data.loginTidaro = loginTidaro;
    if (passwordTidaro) data.passwordTidaro = passwordTidaro;
    if (!Object.keys(data).length) return;

    this.error.set(null);
    this.success.set(null);
    this.userService.update(data).subscribe({
      next: () => {
        this.success.set('Account updated successfully.');
        this.form.reset();
      },
      error: (e) => this.error.set(e.error?.message ?? 'Update failed.')
    });
  }

  deleteAccount() {
    if (!confirm('Delete your account permanently? This cannot be undone.')) return;
    this.userService.delete().subscribe({
      next: () => this.auth.logout(),
      error: (e) => this.error.set(e.error?.message ?? 'Delete failed.')
    });
  }
}