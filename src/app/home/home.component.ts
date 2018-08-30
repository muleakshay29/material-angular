import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { NavbarService } from '../Services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  title: string = 'Welcome to Mohalla';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private nav: NavbarService) {}

  ngOnInit()
  {
    this.nav.show();
  }
}
