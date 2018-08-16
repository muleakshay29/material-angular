import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { CityMasterComponent } from './city-master/city-master.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {title: "Dashbord"} },
  { path: 'login', component: LoginComponent, data: {title: "Login"} },
  { path: 'home', component: HomeComponent, data: {title: "Dashbord"} },
  { path: 'list', component: ListComponent, data: {title: "List"} },
  { path: 'city-master', component: CityMasterComponent, data: {title: "City Master"} } 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
