import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mohalla';
  previousUrl: string;

  constructor(private renderer: Renderer2, private router: Router) 
  {
    this.router.events
      .subscribe((event) => 
      {
        if (event instanceof NavigationStart) 
        {
          let currentUrlSlug = event.url.slice(1)

          if (currentUrlSlug == "login") 
          {
            this.renderer.removeClass(document.body, 'bodyClass1');
            this.renderer.addClass(document.body, 'bodyClass2');
          }
          else
          {
            this.renderer.removeClass(document.body, 'bodyClass2');
            this.renderer.addClass(document.body, 'bodyClass1');
          }
        }
      });
 
  }
}
