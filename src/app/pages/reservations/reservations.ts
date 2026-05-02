import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption, MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { ParkingService } from '../../core/services/parking.service';
import { ParkingReservation } from '../../core/models/parking-reservation';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard, MatCardContent,
    MatButton,
    MatFormField, MatLabel, MatInput, MatSuffix,
    MatSelect, MatOption,
    MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatNativeDateModule,
    DatePipe
  ],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css'
})
export class Reservations implements OnInit {
  protected form: FormGroup;
  protected reservations = signal<ParkingReservation[]>([]);
  protected error = signal<string | null>(null);
  protected createError = signal<string | null>(null);

  readonly floors = [
    { value: 'MINUS_1', label: 'Floor -1' },
    { value: 'MINUS_2', label: 'Floor -2' },
    { value: 'OUTDOOR', label: 'Outdoor' }
  ];

  get minDate(): Date {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }

  constructor(private fb: FormBuilder, private parking: ParkingService) {
    this.form = this.fb.group({
      city: ['CRACOW', Validators.required],
      floor: ['MINUS_1', Validators.required],
      targetDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.error.set(null);
    this.parking.getOwn().subscribe({
      next: (res) => this.reservations.set(res),
      error: () => this.error.set('Failed to load reservations.')
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.createError.set(null);
    const raw = this.form.value;
    const targetDate = raw.targetDate instanceof Date
      ? raw.targetDate.toLocaleDateString('en-CA')
      : raw.targetDate;
    this.parking.create({ ...raw, targetDate }).subscribe({
      next: () => {
        this.form.patchValue({ targetDate: null });
        this.load();
      },
      error: (e) => this.createError.set(e.error?.message ?? 'Failed to create reservation.')
    });
  }

  cancel(id: number) {
    this.parking.cancel(id).subscribe({
      next: () => this.load(),
      error: (e) => this.error.set(e.error?.message ?? 'Failed to cancel reservation.')
    });
  }

  statusClass(status: string): string {
    return 'status-' + status.toLowerCase().replace('_', '-');
  }
}