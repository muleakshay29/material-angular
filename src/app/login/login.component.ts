import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../Services/navbar.service';
import { AuthService } from "../Services/auth.service";
import { MatSnackBar } from '@angular/material';
import { ValidationService } from "../validators/validation.service";

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

  getErrorMessage(errorFlag) {
    if (errorFlag == 2) {
      return this.loginForm.controls.password.hasError('required') ? 'You must enter password' : '';
    }
    else {
      return this.loginForm.controls.email.hasError('required') ? 'You must enter an email' :
        this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
    }
  }

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private nav: NavbarService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.nav.hide();

    this.loginForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.email]
      ],
      password: ['', Validators.required],
      sellerCheck: ['yes']
    });

    /*this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      sellerCheck: new FormControl('yes')
    });*/

    this.AuthService.logout();

    this.successUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.unsuccessUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  openSnackBar(loginSuccessMessage) {
    this.snackBar.open(loginSuccessMessage, "", {
      duration: 2000,
    });
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      this.AuthService.login(username, password)
        .subscribe((loginCheck) => this.checkLogin(loginCheck));
    }
  }

  checkLogin(data) {
    if (data === 1) {
      this.loginError = false;
      this.openSnackBar("Login successful");
      this.router.navigate([this.successUrl]);
    }
    else {
      this.loginError = true;
      this.openSnackBar("Invalid login credentioals");
      this.router.navigate([this.unsuccessUrl]);
    }
  }

}
