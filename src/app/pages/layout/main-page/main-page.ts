import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage {
  constructor(protected auth: Auth) {}
}
