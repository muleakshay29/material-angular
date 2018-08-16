import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CityElements {
  City_id: number;
  City_name: string;
}

export interface DialogData {
  City_name: string;
}

const cityList: CityElements[] = [
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
  dataSource: MatTableDataSource<CityElements>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title = "City Master";
  cityMaster : FormGroup;

  Country_id: number;
  State_id: number;
  City_name: string;

  openDialog(): void 
  {
    const dialogRef = this.dialog.open(CityDialog, {
      width: '350px',
      data: {City_name: this.City_name}
    });
  }

  constructor(
    private nav: NavbarService,
    public dialog: MatDialog) 
  { 
    this.dataSource = new MatTableDataSource(cityList);
  }

  ngOnInit() {
    this.nav.show();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.cityMaster = new FormGroup({
      countryId: new FormControl('', Validators.required),
      stateId: new FormControl('', Validators.required),
      cityName: new FormControl('', Validators.required)
    });
  }

  applyFilter(filterValue: string) 
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
