import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';
import { FormControl, Validators, FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MasterService } from "../Services/master.service";
import { fetchCountry, fetchState, fetchCity, editCity } from "../common-constants";
//import { map } from 'rxjs/operators';
//import { zipcodeValidator } from "../validators/data-exist.directive";
import { ValidationService } from "../validators/validation.service";
import { AlreadyExistValidator } from "../validators/already-exist-validator.directive";

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {

  displayedColumns: string[] = ['Action', 'City_id', 'City_name'];
  dataSource: MatTableDataSource<fetchCity>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title = "City Master";
  cityMaster: FormGroup;

  countryList: fetchCountry[];
  stateList: fetchState[];
  cityList: fetchCity[];
  cityDetails: editCity;
  isLoadingResults = false;
  tableHeight: string;
  isLoadingData = false;

  constructor(
    public nav: NavbarService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private MasterService: MasterService,
    private fb: FormBuilder) {
    //this.fetchCity();
    this.isLoadingData = true;
    setTimeout(this.fetchCity(), 2000);
  }

  openSnackBar(loginSuccessMessage) {
    this.snackBar.open(loginSuccessMessage, "", {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.nav.show();
    this.fetchCountry();

    this.cityMaster = this.fb.group({
      Country_id: ['', Validators.required],
      State_id: ['', Validators.required],
      City_name: ['',
        [Validators.required, Validators.minLength(3), ValidationService.characterPattern],
        AlreadyExistValidator(this.MasterService)
      ],
    });
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

  clearInput(event) {
    this.cityMaster.controls.City_name.value('');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchCountry() {
    this.MasterService.fetchCountry()
      .subscribe(countryList => this.countryList = countryList);
  }

  fetchState(event) {
    const countryId = this.cityMaster.controls.Country_id.value;
    this.MasterService.fetchState(countryId)
      .subscribe(stateList => this.stateList = stateList);
  }

  fetchCity() {
    this.MasterService.fetchCity()
      .subscribe(cityList => {
        this.cityList = cityList;
        this.dataSource = new MatTableDataSource(this.cityList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.cityList.length == 0) {
          this.tableHeight = '0px';
        }
        else if (this.cityList.length <= 5) {
          this.tableHeight = '500px';
        }
        else if (this.cityList.length > 5 && this.cityList.length < 8) {
          this.tableHeight = '600px';
        }
        else {
          this.tableHeight = '740px';
        }

        this.isLoadingData = false;
      });
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.isLoadingResults = true;
    const cityData = this.cityMaster.value;
    this.MasterService.addCity(cityData)
      .subscribe((addCity) => this.addCity(addCity, formDirective));
  }

  addCity(data, formDirective: FormGroupDirective) {
    if (data > 0) {
      this.openSnackBar("City created successfuly.");
      formDirective.resetForm();
      this.cityMaster.reset();
      this.cityMaster.markAsPristine();
      this.cityMaster.markAsUntouched();
      this.cityMaster.updateValueAndValidity();
      this.fetchCity();
      this.isLoadingResults = false;
    }
    else {
      this.isLoadingResults = false;
      this.openSnackBar("Error creating City.");
    }
  }

  deleteCity(cityId) {
    this.isLoadingResults = true;
    this.MasterService.cityDelete(cityId)
      .subscribe(deleteCity => {
        if (deleteCity > 0) {
          this.openSnackBar("City deleted successfully.");
          this.fetchCity();
          this.isLoadingResults = false;
        }
        else {
          this.openSnackBar("Error creating City.");
          this.isLoadingResults = false;
        }
      }
      );
  }

}