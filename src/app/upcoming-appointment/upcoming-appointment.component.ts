import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatTableDataSource, MatPaginator, MatSort, MatTooltip } from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef,MatSnackBar} from '@angular/material';
import {GuardService} from '../services/guard.service';
import {SearchDoctorService} from '../services/search-doctor.service';

@Component({
  selector: 'app-upcoming-appointment',
  templateUrl: './upcoming-appointment.component.html',
  styleUrls: ['./upcoming-appointment.component.css']
})
export class UpcomingAppointmentComponent implements OnInit {

  appointmentList: any[];
  displayedColumns: any;
  public dataSource: any;
  show(value) {
    
    this.dialog.open(AppointmentDetailsComponent, {
      data: value
    });
    
  }
  constructor(private route:Router,
  public dialog: MatDialog, 
  private httpClient: HttpClient,
  public snackBar:MatSnackBar,
  public service:SearchDoctorService) {

  this.displayedColumns = ['appointmentId', 'appointmentDate','patientName','doctorName', 'Place'];



}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {


  }
  ngOnInit() {


    this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/upcomingAppointment', { userLoginId: this.service.backend.userLoginId  })
//    this.httpClient.post('http://localhost:8080/weHealU/upcomingAppointment', { userLoginId: this.service.backend.userLoginId  })
      .subscribe((data: any[]) => {
        this.appointmentList = data;
        this.dataSource = new MatTableDataSource(this.appointmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.appointmentList);
        
      })

      this.snackBar.open('Your Upcoming Appointment',"", {
      duration: 5000,
    });
  }

}




@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  
})
export class AppointmentDetailsComponent implements OnInit {

 
  constructor(private route:Router,
  public snackBar:MatSnackBar,
  private httpClient:HttpClient,
  public dialogRef: MatDialogRef<AppointmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA,) public data: any, ) {}
  
  onoClick(data)
  {
      this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/cancelAppointment', data)
      .subscribe((data: any[]) => {
          window.location.reload();       

       })
      var email=data.user.email;
      this.dialogRef.close();
       this.snackBar.open('Confirmation has been sent to registered email id of cancellation',"", {
      duration: 5000,
    });

  }
  ngOnInit() {
    
  }

  }

