import { Component } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(
    private nav: NavbarService) {}

}
