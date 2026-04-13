import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-main-layout',
    imports: [
        MatButton,
        MatCard,
        MatIcon,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        MatToolbar,
        RouterLink
    ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  standalone: true
})
export class MainLayout {}
