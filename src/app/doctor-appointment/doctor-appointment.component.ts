import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatTableDataSource, MatPaginator, MatSort, MatTooltip } from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef,MatSnackBar} from '@angular/material';
import {GuardService} from '../services/guard.service';
import {SearchDoctorService} from '../services/search-doctor.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {


  appointmentList: any[];
  displayedColumns: any;
  public dataSource: any;

  constructor(private route:Router,
  public dialog: MatDialog, 
  private httpClient: HttpClient,
  public snackBar:MatSnackBar,
  public service:SearchDoctorService) { 
    
  this.displayedColumns = ['appointmentId', 'appointmentDate','patientName', 'Place'];

}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  show(value)
  {
   
     this.dialog.open(DoctorAppointmentDetailsComponent, {
      data: value
    });
  }
  ngOnInit() {
    
    this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/upcomingDoctorAppointment', { userLoginId: this.service.backend.userLoginId  })
    //this.httpClient.post('http://localhost:8080/weHealU/upcomingDoctorAppointment', { userLoginId: this.service.backend.userLoginId  })
      .subscribe((data: any[]) => {
        this.appointmentList = data;
        this.dataSource = new MatTableDataSource(this.appointmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        
      })

      this.snackBar.open('Your Upcoming Appointment',"", {
      duration: 5000,
    });
  }
  }





@Component({
  selector: 'app-doctor-appointment-list',
  templateUrl: './doctor-appointment-list.component.html',
  
})
export class DoctorAppointmentDetailsComponent implements OnInit {

  patientFile:any[];
  gender:any;
  constructor(private route:Router,
  public snackBar:MatSnackBar,
  private httpClient:HttpClient,
  public dialogRef: MatDialogRef<DoctorAppointmentDetailsComponent>,
  @Inject(MAT_DIALOG_DATA,) public data: any, ) {
    var a=data.patientDetails.patientHistory;
    a=a.substring(0,(a.length-1));
    this.patientFile=a.split(",");
    if(data.patientDetails.gender=='1')
    {
      this.gender='Male';
    }
    else
    {
      this.gender='Female';
    }
  }
  
  onoClick(data)
  {
      
      this.dialogRef.close();

  }
  ngOnInit() {
    
  }

  }

