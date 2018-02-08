import { Router } from '@angular/router';
import { GuardService } from './../services/guard.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatTableDataSource, MatPaginator, MatSort, MatTooltip } from '@angular/material';
import { SearchDoctorService } from '../services/search-doctor.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit {
  appointmentList: any[];
  displayedColumns: any;
  dataSource: any;
  show(value) {

    this.service.doctorId = value;
    this.route.navigate(['/service-feeds']);
  }
  constructor(private route: Router, private httpClient: HttpClient, public service: SearchDoctorService) {

    this.displayedColumns = ['appointmentId', 'appointmentDate', 'patientName', 'doctorName', 'Place'];



  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {


  }
  ngOnInit() {
    if (this.service.backend==null) {
      this.service.backend = { 'userLoginId': 0 };
    }
    this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/appointmentList', { userLoginId: this.service.backend.userLoginId })
    //this.httpClient.post('http://localhost:8080/weHealU/appointmentList', { userLoginId: this.service.backend.userLoginId })
      .subscribe((data: any[]) => {
        this.appointmentList = data;
        this.dataSource = new MatTableDataSource(this.appointmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //  console.log(this.appointmentList);
      })

  }




}
