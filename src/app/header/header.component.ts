import { Component, OnInit } from '@angular/core';
import {SearchDoctorService} from '../services/search-doctor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
msg:any;
  constructor(private service: SearchDoctorService,private router: Router) { 
  
  }

  onLogout(){
    this.service.toggleLog=!this.service.toggleLog;
     localStorage.removeItem("loggedUser");

     this.service.backend=null;
     console.log(this.service.backend);
     //alert("You are logged out");

  }
  
  profile()
  { if(this.service.backend.userLogin.userType=="0")
 this.router.navigate(['/userhomepage']);
 else 
 this.router.navigate(['/doctorhomepage']);

  }
  ngOnInit() {

  //   if(this.service.backend!=null &&this.service.backend.userType==2)
  //   {
  //       this.msg="Hi,Admin";
  //   }
  //   else if(this.service.backend.userLogin.userType==1)
  //   {
      
  //     this.msg="Hi,"+this.service.backend.doctorName;
  //   }
  //   else if(this.service.backend.userLogin.userType==0)
  //   {
  //     this.msg="Hi,"+this.service.backend.userName;
  //   }
  // }

}

}