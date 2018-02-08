import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { UpcomingAppointmentComponent } from './upcoming-appointment/upcoming-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MiddleComponent } from './landing page/middle.component';
import { BookPatientDetailComponent } from "./book-patient-detail/book-patient-detail.component";
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SearchViewComponent } from './search-view/search-view.component';
import { ReviewComponent } from './review/review.component';
import { ServiceFeedsComponent } from './service-feeds/service-feeds.component';
import { PatientregComponent } from './patientreg/patientreg.component';
import { DoctorregComponent } from './doctorreg/doctorreg.component';
import {DoctorregmainComponent} from './doctorregmain/doctorregmain.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { DoctorhomepageComponent } from './doctorhomepage/doctorhomepage.component';
import {LocateHospitalComponent}from'./side-bar-feature/locate-hospital/locate-hospital.component';

import {GuardService } from './services/guard.service';
import { ShowFeedsComponent } from './show-feeds/show-feeds.component';
import { ContactComponent } from './contact/contact.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';

 export const routes: Routes = [
  {
    path:'',
    component: MiddleComponent,

   
  },
  {
  path:'home',
  component: MiddleComponent,
},
{
  path:'contact',
  component: ContactComponent

},
  {
  path:'searchDoctor/booking',
  component: BookPatientDetailComponent,
  canActivate: [GuardService]
  },
{
  path:'login',
  component:LoginComponent
},
 { path:'patientreg',
   component:PatientregComponent
  },
  { path:'doctorreg',
   component:DoctorregComponent
  },
  { path:'doctorregmain',
   component:DoctorregmainComponent
  },
{
path:'forgot',
component:ForgotComponent
},
{
  path:'searchDoctor',
  component:SearchViewComponent
},
{
path:'review',
component:ReviewComponent
},
{
path: 'service-feeds',
component: ServiceFeedsComponent,
canActivate: [GuardService]

},
{
  path:'userhomepage',
  component:UserhomepageComponent,
  canActivate: [GuardService]
},
{
  path:'adminhomepage',
  component:AdminhomepageComponent,
  canActivate: [GuardService] 
},
{
  path:'doctorhomepage',
  component:DoctorhomepageComponent,
  canActivate: [GuardService]
},
{
path:'locatehospitals',
component:LocateHospitalComponent
},
{
path:'showFeeds',
component:ShowFeedsComponent
},
{
path:'appointmentList',
component:AppointmentListComponent,
canActivate: [GuardService]
},
{
path:'upcomingAppointment',
component:UpcomingAppointmentComponent,
canActivate: [GuardService]
},
{
    path:'doctorAppointment',
    component: DoctorAppointmentComponent,
    canActivate: [GuardService]
  },
  {
    path:'doctorList',
    component: DoctorlistComponent,
    canActivate: [GuardService]
  },
];

@NgModule({
   imports: [ RouterModule.forRoot(routes, {useHash:true}) ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }

