import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  successUrl: string;
  title = "Login";
  hide = true;
  loginForm: FormGroup;  

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
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.successUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login()
  {
    //const username = this.loginForm.controls.username.value;
    //const password = this.loginForm.controls.password.value;
    if(this.loginForm.valid)
    {
      this.router.navigate([this.successUrl]);
    }
  }

}
