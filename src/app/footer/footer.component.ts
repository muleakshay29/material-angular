import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private nav: NavbarService) {}

  ngOnInit() {
  }

}
