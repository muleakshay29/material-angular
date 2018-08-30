import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CityMasterComponent } from './city-master/city-master.component';
import { CityEditComponent } from './city-master/city-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: {title: "Login"} },
  { path: 'login', component: LoginComponent, data: {title: "Login"} },
  { path: 'home', component: HomeComponent, data: {title: "Dashbord"} },
  { path: 'city-master', component: CityMasterComponent, data: {title: "City Master"} },
  { path: 'city-master/:id', component: CityEditComponent, data: {title: "City Master Edit"} }  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
