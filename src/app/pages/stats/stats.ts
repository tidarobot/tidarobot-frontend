import { Component, OnInit, signal } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { StatsService } from '../../core/services/stats.service';
import { DayRanking, FloorRanking, UserRanking } from '../../core/models/stats';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    MatCard, MatCardContent,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats implements OnInit {
  protected days = signal<DayRanking[]>([]);
  protected daysTotal = signal(0);
  protected daysPage = signal(0);

  protected users = signal<UserRanking[]>([]);
  protected usersTotal = signal(0);
  protected usersPage = signal(0);

  protected floors = signal<FloorRanking[]>([]);

  protected error = signal<string | null>(null);

  readonly dayColumns = ['rank', 'targetDate', 'reservationCount'];
  readonly userColumns = ['rank', 'username', 'reservationCount'];
  readonly floorColumns = ['floor', 'reservationCount'];

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadDays();
    this.loadUsers();
    this.loadFloors();
  }

  loadDays(page = 0) {
    this.statsService.getDays({ page, size: 20 }).subscribe({
      next: (res) => {
        this.days.set(res.content);
        this.daysTotal.set(res.totalElements);
        this.daysPage.set(page);
      },
      error: () => this.error.set('Failed to load day stats.')
    });
  }

  loadUsers(page = 0) {
    this.statsService.getUsers({ page, size: 20 }).subscribe({
      next: (res) => {
        this.users.set(res.content);
        this.usersTotal.set(res.totalElements);
        this.usersPage.set(page);
      },
      error: () => this.error.set('Failed to load user stats.')
    });
  }

  loadFloors() {
    this.statsService.getFloors({ size: 3 }).subscribe({
      next: (res) => this.floors.set(res.content),
      error: () => this.error.set('Failed to load floor stats.')
    });
  }

  onDayPage(e: PageEvent) { this.loadDays(e.pageIndex); }
  onUserPage(e: PageEvent) { this.loadUsers(e.pageIndex); }

  floorLabel(f: string): string {
    const map: Record<string, string> = {
      MINUS_1: 'Floor -1',
      MINUS_2: 'Floor -2',
      OUTDOOR: 'Outdoor'
    };
    return map[f] ?? f;
  }

  rankOf(page: number, index: number): number {
    return page * 20 + index + 1;
  }
}