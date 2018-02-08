import { Router } from '@angular/router';
import { GuardService } from './../services/guard.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatTableDataSource, MatPaginator, MatSort, MatTooltip, MatSnackBar } from '@angular/material';
import { SearchDoctorService } from '../services/search-doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {
  appointmentList: any[];
  displayedColumns: any;
  dataSource: any;
  status: any;
  toggle: boolean;
  data = {
    "userLoginId": 64,
    "doctorName": "robert downey jr.",
    "contact": "9090909090",
    "mciId": "123-dsfd",
    "experience": "4-8",
    "timeSlot": "17:00 - 19:00",
    "workDays": "2",
    "gender": "M",
    "qualifications": "BMBS",
    "subCategory": {
      "subCategoryId": 15,
      "subCategoryName": "Vascular Surgeon",
      "category": {
        "categoryId": 4,
        "categoryName": "Surgen"
      }
    },
    "zipCode": {
      "zipCode": 577004,
      "area": "ganganagar",
      "city": "davanagere",
      "state": "karnataka"
    },
    "status": 1,
    "userLogin": null
  };
  constructor(private route: Router,
   private fb: FormBuilder,
    private httpClient: HttpClient, 
    public service: SearchDoctorService,
    public snackBar:MatSnackBar,
    ) {
    this.displayedColumns = ['DoctorId', 'DoctorName', 'Contact', 'Place'];
  }

deactivateStatus()
{document.getElementById("modalOpen").click();
  this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/deactivateDoctor',this.data)
      .subscribe((data: any[]) => {
         this.snackBar.open('Account has been Deactivated',"", {
      duration: 5000,
    });
      })
}
activateStatus()
{
document.getElementById("modalOpen").click();
  this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/activateDoctor',this.data)
      .subscribe((data: any[]) => {
             this.snackBar.open('Account has been activated',"", {
      duration: 5000,
    }); 
      })
}
  show(value) {
    this.data = value;
    if (value.status == 1) {
      this.status = "Activated";
      this.toggle = true;
    }
    else if (value.status == 2) {
      this.status = "Deactivated";
      this.toggle = false;
    }
    document.getElementById("modalOpen").click();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/doctorList',
      {
        doctorName: "",
        contact: "",
      })
      .subscribe((data: any[]) => {
        this.appointmentList = data;
        this.dataSource = new MatTableDataSource(this.appointmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.appointmentList);
      })
  }

}
