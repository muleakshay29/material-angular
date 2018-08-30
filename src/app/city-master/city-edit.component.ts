import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MasterService } from "../Services/master.service";
import { fetchCountry, fetchState, editCity } from "../common-constants";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ValidationService } from "../validators/validation.service";
import { AlreadyExistValidator } from "../validators/already-exist-validator.directive";

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {

  title = "City Master Edit";
  countryList: fetchCountry[];
  stateList: fetchState[];
  cityMaster: FormGroup;
  CityId: number;

  @Input() cityDetail: editCity;

  constructor(
    public nav: NavbarService,
    public snackBar: MatSnackBar,
    private MasterService: MasterService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
    this.cityMaster = this.fb.group({
      City_id: [''],
      Country_id: ['', Validators.required],
      State_id: ['', Validators.required],
      City_name: ['',
        [Validators.required, Validators.minLength(3), ValidationService.characterPattern]
      ]
    });
  }

  get City_id() {
    return this.cityMaster.get('City_id');
  }

  get Country_id() {
    return this.cityMaster.get('Country_id');
  }

  get State_id() {
    return this.cityMaster.get('State_id');
  }

  get City_name() {
    return this.cityMaster.get('City_name');
  }

  ngOnInit() {
    this.nav.show();
    this.fetchCityDetails();
    this.fetchCountry();
  }

  openSnackBar(loginSuccessMessage) {
    this.snackBar.open(loginSuccessMessage, "", {
      duration: 2000,
    });
  }

  get f() { return this.cityMaster.controls; }

  fetchCountry() {
    this.MasterService.fetchCountry()
      .subscribe(countryList => this.countryList = countryList);
  }

  loadState(countryId) {
    this.MasterService.fetchState(countryId)
      .subscribe(stateList => this.stateList = stateList);
  }

  fetchState() {
    const countryId = this.cityMaster.controls.Country_id.value;
    this.MasterService.fetchState(countryId)
      .subscribe(stateList => this.stateList = stateList);
  }

  fetchCityDetails() {
    this.CityId = +this.route.snapshot.paramMap.get('id');
    this.MasterService.getCityDetails(this.CityId)
      .subscribe(cityDetails => {
        this.cityMaster.setValue(
          {
            City_id: cityDetails.City_id,
            Country_id: cityDetails.Country_id,
            State_id: cityDetails.State_id,
            City_name: cityDetails.City_name
          }
        );
        this.loadState(cityDetails.Country_id);
      }
      );
  }

  onSubmit() {
    const cityData = this.cityMaster.value;
    this.MasterService.updateCity(cityData)
      .subscribe((updateCity) => this.updateCity(updateCity));
  }

  updateCity(data) {
    if (data > 0) {
      this.openSnackBar("City is updated successfully.");
      this.location.back();
    }
    else {
      this.openSnackBar("Error updating City.");
    }
  }

  cancelClick() {
    this.location.back();
  }
}
