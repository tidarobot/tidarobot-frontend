import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard, MatCardContent,
    MatButton,
    MatFormField, MatLabel, MatInput,
    MatSelect, MatOption,
    MatTableModule,
    MatPaginatorModule,
    DatePipe
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  protected filterForm: FormGroup;
  protected users = signal<User[]>([]);
  protected totalElements = signal(0);
  protected pageSize = signal(20);
  protected currentPage = signal(0);
  protected error = signal<string | null>(null);

  readonly columns = ['username', 'email', 'role', 'status', 'createdAt', 'actions'];
  readonly statuses = ['PENDING', 'APPROVED', 'REJECTED'];
  readonly roles = ['USER', 'ADMIN'];

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.filterForm = this.fb.group({
      username: [''],
      role: [''],
      status: ['']
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    const { username, role, status } = this.filterForm.value;
    this.adminService.getUsers({
      page: this.currentPage(),
      size: this.pageSize(),
      sort: 'createdAt,desc',
      username: username || undefined,
      role: role || undefined,
      status: status || undefined
    }).subscribe({
      next: (page) => {
        this.users.set(page.content);
        this.totalElements.set(page.totalElements);
        this.error.set(null);
      },
      error: () => this.error.set('Failed to load users.')
    });
  }

  search() {
    this.currentPage.set(0);
    this.load();
  }

  onPage(event: PageEvent) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.load();
  }

  setStatus(id: number, status: string) {
    this.adminService.updateStatus(id, status).subscribe({
      next: () => this.load(),
      error: (e) => this.error.set(e.error?.message ?? 'Failed to update status.')
    });
  }
}