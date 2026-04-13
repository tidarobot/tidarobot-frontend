import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import {MainLayout} from './pages/layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    RouterOutlet,
    MainLayout
  ],
  styleUrl: './app.css'
})
export class App {
}
