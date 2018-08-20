import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MasterService } from "../Services/master.service";
import { fetchCountry, fetchState, fetchCity } from "../common-constants";
import { map } from 'rxjs/operators';

export interface CityElements {
  City_id: number;
  City_name: string;
}

export interface DialogData {
  City_name: string;
}

const cityList2: fetchCity[] = [
  {
    City_id: 1,
    City_name: "Mumbai"
  },
  {
    City_id: 2,
    City_name: "Nagpur"
  },
  {
    City_id: 3,
    City_name: "Pune"
  },
  {
    City_id: 4,
    City_name: "Nashik"
  },
  {
    City_id: 5,
    City_name: "Kolhapur"
  },
  {
    City_id: 6,
    City_name: "Nanded"
  },
  {
    City_id: 7,
    City_name: "Satara"
  },
  {
    City_id: 8,
    City_name: "Aurangabad"
  },
  {
    City_id: 9,
    City_name: "Nagar"
  },
  {
    City_id: 10,
    City_name: "Dhule"
  },
];

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
  City_name: string;
  countryList: fetchCountry[];
  stateList: fetchState[];
  cityList: fetchCity[];

  openDialog(): void 
  {
    const dialogRef = this.dialog.open(CityDialog, {
      width: '350px',
      data: {City_name: this.City_name}
    });
  }

  constructor(
    private nav: NavbarService,
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

    //this.dataSource = new MatTableDataSource(cityList2);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.cityMaster = new FormGroup({
      countryId: new FormControl('', Validators.required),
      stateId: new FormControl('', Validators.required),
      cityName: new FormControl('', [
                                      Validators.required,
                                      Validators.minLength(3)
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
                      .pipe(
                        map( data => {
                          console.log(data);
                          this.dataSource = new MatTableDataSource(data);
                          this.cityList = data;
                        })
                      );
                      //.subscribe( cityList => this.cityList = cityList );
  }

  onSubmit()
  {
    console.log(cityList2);
    console.log(this.cityList);

    /*const cityData = this.cityMaster.value;
    this.MasterService.addCity(cityData)
                      .subscribe( (addCity) => this.addCity(addCity) );*/
  }

  addCity(data)
  {
    if(data > 0)
    {
      this.openSnackBar("City created successfuly.");
    }
    else
    {
      this.openSnackBar("Error creating City.");
    }
  }

}

@Component({
  selector: 'city-dialog',
  templateUrl: 'city-dialog.html',
})
export class CityDialog {

  constructor(
    public dialogRef: MatDialogRef<CityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
