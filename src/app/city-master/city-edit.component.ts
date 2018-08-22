import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MasterService } from "../Services/master.service";
import { fetchCountry, fetchState, editCity } from "../common-constants";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {

  title = "City Master Edit";
  countryList: fetchCountry[];
  stateList: fetchState[];
  cityMaster : FormGroup;
  CityId : number;

  @Input() cityDetail: editCity;

  constructor(
    public nav: NavbarService,
    public snackBar: MatSnackBar,
    private MasterService: MasterService,
    private route: ActivatedRoute,
    private location: Location) 
  {    
    this.cityMaster = new FormGroup({
      cityId: new FormControl(''),
      countryId: new FormControl('', Validators.required),
      stateId: new FormControl('', Validators.required),
      cityName: new FormControl('', [
                                      Validators.required,
                                      //Validators.minLength(3)
                                ])
    });
  }

  ngOnInit() 
  {
    this.nav.show();
    this.fetchCityDetails();
    this.fetchCountry();   
  }

  openSnackBar(loginSuccessMessage) 
  {
    this.snackBar.open(loginSuccessMessage, "", {
      duration: 2000,
    });
  }

  get f() { return this.cityMaster.controls; }

  fetchCountry()
  {
    this.MasterService.fetchCountry()
                      .subscribe( countryList => this.countryList = countryList );
  }

  loadState(countryId)
  {
    this.MasterService.fetchState(countryId)
                      .subscribe( stateList => this.stateList = stateList );
  }

  fetchState()
  {
    const countryId = this.cityMaster.controls.countryId.value;
    this.MasterService.fetchState(countryId)
                      .subscribe( stateList => this.stateList = stateList );
  }

  fetchCityDetails()
  {
    this.CityId = +this.route.snapshot.paramMap.get('id');
    this.MasterService.getCityDetails(this.CityId)
                      .subscribe(cityDetails => 
                                  {
                                    this.cityMaster.setValue(
                                                    {
                                                      cityId: cityDetails.City_id,
                                                      countryId: cityDetails.Country_id, 
                                                      stateId: cityDetails.State_id,
                                                      cityName: cityDetails.City_name
                                                    }
                                                  );
                                    this.loadState(cityDetails.Country_id);
                                  }
                                );
  }

  onSubmit()
  {
    const cityData = this.cityMaster.value;
    this.MasterService.updateCity(cityData)
                      .subscribe( (updateCity) => this.updateCity(updateCity) );
  }

  updateCity(data)
  {
    if(data > 0)
    {
      this.openSnackBar("City is updated successfully.");
      this.location.back();
    }
    else
    {
      this.openSnackBar("Error updating City.");
    }
  }
}
