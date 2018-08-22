import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MasterService } from "../Services/master.service";
import { fetchCountry, fetchState, fetchCity, editCity } from "../common-constants";
import { map } from 'rxjs/operators';

export interface DialogData {
  City_name: string;
}

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
  cityMaster : FormGroup;

  Country_id: number;
  State_id: number;
  //City_name: string;
  //City_id: number;
  countryList: fetchCountry[];
  stateList: fetchState[];
  cityList: fetchCity[];
  cityDetails: editCity;
  isLoadingResults = false;

  /*openDialog(CityName, CityId): void 
  {
    const dialogRef = this.dialog.open(CityDialog, {
      width: '350px',
      data: {City_name: CityName, City_id: CityId}
    });
  }*/

  constructor(
    public nav: NavbarService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private MasterService: MasterService) 
  {    
    this.fetchCity();    
  }

  openSnackBar(loginSuccessMessage) 
  {
    this.snackBar.open(loginSuccessMessage, "", {
      duration: 2000,
    });
  }

  ngOnInit() 
  {
    this.nav.show();
    this.fetchCountry();

    this.cityMaster = new FormGroup({
      countryId: new FormControl('', Validators.required),
      stateId: new FormControl('', Validators.required),
      cityName: new FormControl('', [
                                      Validators.required,
                                      //Validators.minLength(3)
                                ])
    });
  }

  get f() { return this.cityMaster.controls; }

  applyFilter(filterValue: string) 
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchCountry()
  {
    this.MasterService.fetchCountry()
                      .subscribe( countryList => this.countryList = countryList );
  }

  fetchState(event)
  {
    const countryId = this.cityMaster.controls.countryId.value;
    this.MasterService.fetchState(countryId)
                      .subscribe( stateList => this.stateList = stateList );
  }

  fetchCity()
  {
    this.MasterService.fetchCity()
        .subscribe(cityList => 
          {
            this.cityList = cityList;
            this.dataSource = new MatTableDataSource(this.cityList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
  }

  onSubmit(formDirective: FormGroupDirective)
  {
    this.isLoadingResults = true;
    const cityData = this.cityMaster.value;
    this.MasterService.addCity(cityData)
                      .subscribe( (addCity) => this.addCity(addCity, formDirective) );
  }

  addCity(data, formDirective: FormGroupDirective)
  {
    if(data > 0)
    {
      this.openSnackBar("City created successfuly.");
      formDirective.resetForm();
      this.cityMaster.reset();
      this.cityMaster.markAsPristine();
      this.cityMaster.markAsUntouched();
      this.cityMaster.updateValueAndValidity();
      this.fetchCity();
      this.isLoadingResults = false;
    }
    else
    {
      this.isLoadingResults = false;
      this.openSnackBar("Error creating City.");
    }
  }

  deleteCity(cityId)
  {
    this.isLoadingResults = true;
    this.MasterService.cityDelete(cityId)
                      .subscribe( deleteCity =>
                        {
                          if( deleteCity > 0 )
                          {
                            this.openSnackBar("City deleted successfully.");
                            this.fetchCity();
                            this.isLoadingResults = false;
                          }
                          else
                          {
                            this.openSnackBar("Error creating City.");
                            this.isLoadingResults = false;
                          }
                        }
                      );
  }

}




/**
 * ************This block is used for popup dialogue******************
 
@Component({
  selector: 'city-dialog',
  templateUrl: 'city-dialog.html',
})
export class CityDialog 
{
  constructor(
    public dialogRef: MatDialogRef<CityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private MasterService: MasterService,
    public snackBar: MatSnackBar) {}

  openSnackBar(loginSuccessMessage) 
  {
    this.snackBar.open(loginSuccessMessage, "", {
      duration: 2000,
    });
  }

  deletConfirm(City_id): void 
  {
    console.log(City_id)
    //this.dialogRef.close();

    this.MasterService.cityDelete(City_id)
                      .subscribe( deleteCity =>
                        {
                          if( deleteCity > 0 )
                          {
                            this.openSnackBar("City deleted successfully.");
                            //this.fetchCity();
                          }
                          else
                          {
                            this.openSnackBar("Error creating City.");
                          }
                        }
                      );
    this.dialogRef.close();
  }

}
*/