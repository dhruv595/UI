import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes, Router} from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MiddleComponent } from './landing page/middle.component';
import { AppRoutingModule } from './app-routing.module';
import { BookPatientDetailComponent } from "./book-patient-detail/book-patient-detail.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HttpClientModule } from "@angular/common/http";
import { ClickOutsideDirective } from './landing page/click-outside.directive';
import { SearchFilterPipe } from './landing page/search-filter.pipe';
import { SearchViewComponent } from './search-view/search-view.component';
import { ServiceFeedsComponent } from './service-feeds/service-feeds.component';
import { ReviewComponent } from './review/review.component';
import {HttpModule } from '@angular/http';
import { PatientregComponent } from './patientreg/patientreg.component';
import { DoctorregComponent } from './doctorreg/doctorreg.component';
import { DoctorregmainComponent } from './doctorregmain/doctorregmain.component';
import { LocateHospitalComponent } from './side-bar-feature/locate-hospital/locate-hospital.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SearchDoctorService } from './services/search-doctor.service';
import { DoctorFilterPipe } from './search-view/doctor-filter.pipe';

import { UserhomepageComponent } from './userhomepage/userhomepage.component';

import { DoctorhomepageComponent } from './doctorhomepage/doctorhomepage.component';
import { GuardService} from './services/guard.service';

import { ShowFeedsComponent } from './show-feeds/show-feeds.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { UpcomingAppointmentComponent ,AppointmentDetailsComponent} from './upcoming-appointment/upcoming-appointment.component';
import { ContactComponent } from './contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DoctorAppointmentComponent,DoctorAppointmentDetailsComponent } from './doctor-appointment/doctor-appointment.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MiddleComponent,
    BookPatientDetailComponent,
    LoginComponent,
    ForgotComponent,
    ClickOutsideDirective,
    SearchFilterPipe,
    SearchViewComponent,
    ServiceFeedsComponent,
    ReviewComponent,
   
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
    AdminhomepageComponent
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    NgbModule.forRoot(),
    
  ],
  entryComponents: [DoctorAppointmentDetailsComponent,
  AppointmentDetailsComponent],
  providers: [SearchDoctorService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
