import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
import { ParkingService } from '../../core/services/parking.service';
import { Auth } from '../../core/services/auth';
import { ParkingReservation } from '../../core/models/parking-reservation';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    RouterLink,
    MatCard, MatCardContent,
    MatButton,
    MatIcon,
    MatPaginator,
    MatProgressBar,
    DatePipe
  ],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History implements OnInit {
  protected reservations = signal<ParkingReservation[]>([]);
  protected totalElements = signal(0);
  protected error = signal<string | null>(null);
  protected loading = signal(false);

  protected page = 0;
  protected pageSize = 10;

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  constructor(private parking: ParkingService, private auth: Auth) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.parking.getHistory(this.page, this.pageSize).subscribe({
      next: (res) => {
        this.reservations.set(res.content);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load reservation history.');
        this.loading.set(false);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.load();
  }

  statusClass(status: string): string {
    return 'status-' + status.toLowerCase().replace('_', '-');
  }
}