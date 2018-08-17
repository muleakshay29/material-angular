import { Component, OnInit,Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../Services/navbar.service';
import { AuthService } from "../Services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Please Sign In";
  hide = true;
  loginForm: FormGroup;  

  successUrl: string;
  unsuccessUrl: string;
  loginCheck: any;
  loginError: boolean = false;

  getErrorMessage(errorFlag) 
  {
    if(errorFlag == 2)
    {
      return this.loginForm.controls.password.hasError('required') ? 'You must enter password' : '';
    }
    else
    {
      return this.loginForm.controls.email.hasError('required') ? 'You must enter an email' :
      this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
    }
  }

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private nav: NavbarService) { }

  ngOnInit() 
  {
    this.nav.hide();
    
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.AuthService.logout();

    this.successUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.unsuccessUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }

  loginSubmit()
  {
    if(this.loginForm.valid)
    {
      const username = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      this.AuthService.login(username, password)
      .subscribe( (loginCheck) => this.checkLogin(loginCheck) );
    }
  }

  checkLogin(data)
  {
    if(data === 1)
    {
      this.loginError = false;
      this.router.navigate([this.successUrl]);
    }
    else
    {
      this.loginError = true;
      this.router.navigate([this.unsuccessUrl]);
    }
  }

}
