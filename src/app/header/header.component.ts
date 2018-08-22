import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    public nav: NavbarService) {
    //this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery = media.matchMedia('(max-width: 1500px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
