import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    Navbar,
    Footer
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;

  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 900px)']).subscribe(res => {
      this.isMobile = res.matches;

      if (this.isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  toggleSidebar() {
    this.sidenav.toggle();
  }
}