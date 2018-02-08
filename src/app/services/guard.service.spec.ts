import { MaterialModule } from './../material.module';
import { AppointmentListComponent } from './../appointment-list/appointment-list.component';
import { ShowFeedsComponent } from './../show-feeds/show-feeds.component';
import { LocateHospitalComponent } from './../side-bar-feature/locate-hospital/locate-hospital.component';
import { DoctorhomepageComponent } from './../doctorhomepage/doctorhomepage.component';
import { UserhomepageComponent } from './../userhomepage/userhomepage.component';
import { ServiceFeedsComponent } from './../service-feeds/service-feeds.component';
import { ReviewComponent } from './../review/review.component';
import { SearchViewComponent } from './../search-view/search-view.component';
import { ForgotComponent } from './../forgot/forgot.component';
import { DoctorregmainComponent } from './../doctorregmain/doctorregmain.component';
import { DoctorregComponent } from './../doctorreg/doctorreg.component';
import { PatientregComponent } from './../patientreg/patientreg.component';
import { LoginComponent } from './../login/login.component';
import { BookPatientDetailComponent } from './../book-patient-detail/book-patient-detail.component';
import { ContactComponent } from './../contact/contact.component';
import { AppRoutingModule } from './../app-routing.module';
import { SearchFilterPipe } from './../landing page/search-filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './../footer/footer.component';
import { HeaderComponent } from './../header/header.component';
import { MiddleComponent } from './../landing page/middle.component';
import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GuardService } from './guard.service';
import { SearchDoctorService } from './search-doctor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { AppComponent } from "../app.component";
import { FileuploadComponent } from "../fileupload/fileupload.component";
import { DoctorFilterPipe } from "../search-view/doctor-filter.pipe";
import { AppointmentDetailsComponent, UpcomingAppointmentComponent } from "../upcoming-appointment/upcoming-appointment.component";
import { DoctorAppointmentComponent, DoctorAppointmentDetailsComponent } from "../doctor-appointment/doctor-appointment.component";
import { DoctorlistComponent } from "../doctorlist/doctorlist.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSnackBarModule, MatDialogModule, MatTooltipModule,
  MatSortModule, MatPaginatorModule, MatButtonModule,
  MatStepperModule, MatFormFieldModule, MatFormFieldControl,
  MatInputModule, MatTableModule, MatDatepickerModule,
  MatNativeDateModule, MatCardModule
} from '@angular/material';
//import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

fdescribe('GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardService, SearchDoctorService,SearchFilterPipe],
      imports: [ReactiveFormsModule, AppRoutingModule, MaterialModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MiddleComponent,
        BookPatientDetailComponent,
        LoginComponent,
        ForgotComponent,
        SearchFilterPipe,
        SearchViewComponent,
        ServiceFeedsComponent,
        ReviewComponent,
        FileuploadComponent,
        PatientregComponent,
        DoctorregComponent,
        DoctorregmainComponent,
        ServiceFeedsComponent,
        LocateHospitalComponent,
        DoctorFilterPipe,
        ShowFeedsComponent,
        UserhomepageComponent,
        DoctorhomepageComponent,
        AppointmentListComponent,
        UpcomingAppointmentComponent,
        AppointmentDetailsComponent,
        ContactComponent,
        DoctorAppointmentComponent,
        DoctorAppointmentDetailsComponent,
        DoctorlistComponent,



      ]
    });
  });
  it('should be created', inject([GuardService,SearchDoctorService,SearchFilterPipe], (service: GuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should have canActivateFunction', inject([GuardService, SearchDoctorService, SearchFilterPipe], (service: GuardService) => {
    expect(service.canActivate).toBeTruthy();
  }));

it('should have canActivateFunction', inject([GuardService, SearchDoctorService, SearchFilterPipe], (service: GuardService) => {

    expect(service.canActivate()).toBe(false);
  }));
});
