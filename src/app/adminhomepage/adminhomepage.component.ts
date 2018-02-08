import { Component, OnInit } from '@angular/core';

import { SearchDoctorService } from '../services/search-doctor.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {

//users: any[]= [{}];
users : any[];

doctors : any[];

verifyDoctor : any[]=[];
verifiedDoctor : any[]=[];
flag='';

name=this.service.backend.userName;
// email=this.service.backend.userLogin.email;
phone=this.service.backend.userContact;
aadhar=this.service.backend.userAadhar;

// private cloudURL1= 'https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/getUserList';
// private cloudURL2= 'https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/getDoctorList';
private localURL1= 'https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/getUserList';
private localURL2= 'https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/getDoctorList';
private cloudURL3 = 'https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/';

// user =  [
// {
// "name" : "Vijay",
// "email" : "vijay@gmail.com",
// "contact" : "9839302116",
// "status" : "active"
// },
// {
// "name" : "Yashu",
// "email" : "yashu@gmail.com",
// "contact" : "9839302116",
// "status" : "active"
// },
// {
// "name" : "Vijay",
// "email" : "vijay@gmail.com",
// "contact" : "9839302116",
// "status" : "active"
// }
// ]

// activeDoctor =  [
// {
// "name" : "Yashu",
// "email" : "yashu@gmail.com",
// "contact" : "9839302116",
// "status" : "active"
// },
// {
// "name" : "Vijay",
// "email" : "vijay@gmail.com",
// "contact" : "9839302116",
// "status" : "active"
// }
// ]

// inactiveDoctor =  [
// {
// "name" : "Yashu",
// "email" : "yashu@gmail.com",
// "contact" : "9839302116",
// "status" : "inactive"
// },
// {
// "name" : "Vijay",
// "email" : "vijay@gmail.com",
// "contact" : "9839302116",
// "status" : "inactive"
// }
// ]

  constructor(private service: SearchDoctorService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.showPatient();
    this.showOldDoctor();
  }
  verify(i,id)
  {
    console.log(id);
    var data={
"userLoginId":id,
"status":"2"
}

    this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/verfiyDoctor',data)
        .subscribe(res => console.log(res));
    let x = document.getElementsByClassName("verify"+i)[0];
    document.getElementsByClassName("status")[i].innerHTML="2";
    x.innerHTML="Verified";
    x.setAttribute("class","verify"+i+" btn btn-success");
  }
  
  setClass(status,i){
    console.log("set called");
    if(status==2){
      document.getElementsByName("verify")[i].innerHTML="Verified";
     return "verify"+i+" btn btn-success";
    }
     else
     return "verify"+i+" btn btn-primary";
  }
  showPatient()
  {
    this.httpClient.get(this.localURL1)
    .subscribe((userData: any[]) => {
     this.users = userData;
      console.log(this.users);
    });

  }
A
showOldDoctor()
  {
    this.httpClient.get(this.localURL2)
    .subscribe((doctorData: any[]) => {
     this.doctors = doctorData;
      console.log(this.doctors);
      // this.verifyDoctor.pop();
      // this.verifiedDoctor.pop();
      // for(var a=0;a<this.doctors.length;a++)
      // {
      //   if(this.doctors[a].userLogin.accountStatus==0)
      //   {
      //     this.verifyDoctor.push(this.doctors[a]);
      //   }
      //   else if(this.doctors[a].userLogin.accountStatus==1)
      //   {
      //     this.verifiedDoctor.push(this.doctors[a]);
      //   }
   // }
    });

  }


  deletePatientValue = function(index) {
        this.users[index].userLogin.accountStatus=0;
        
        let loginData = {
                'userLoginId' : this.users[index].userLoginId,
                'email' : this.users[index].userLogin.email,
                'password' : this.users[index].userLogin.password,
                'userType' : this.users[index].userLogin.userType,
                'accountStatus' : this.users[index].userLogin.accountStatus,
            };

        this.httpClient.post(this.cloudURL3+'updateAccountStatus', loginData)
        .subscribe(res => console.log(this.loginData));

       // this.users.splice(index, 1);
  }

  deleteDoctorValue = function(index) {
        
       this.doctors[index].userLogin.accountStatus=0;
        this.doctor[index].status=1;

        
        let doctorDetails = {
        'userLoginId': this.doctors[index].userLoginId,
        'doctorName': this.doctors[index].doctorName,
        'contact': this.doctors[index].contact,
        'mciId': this.doctors[index].mciId,
        'experience': this.doctors[index].experience,
        'timeSlot': this.doctors[index].timeslot,
        'workDays': this.doctors[index].workDays,
        'gender': this.doctors[index].gender,
        'fee': this.doctors[index].fee,
        'qualifications': this.doctors[index].qualifications,
        'subCategory': {
            'subCategoryId': this.doctors[index].subCategory.subCategoryId,
            'subCategoryName': this.doctors[index].subCategory.subCategoryName,
            'category': {
                'categoryId': this.doctors[index].subCategory.category.categoryId,
                'categoryName': this.doctors[index].subCategory.category.categoryId
            }
        },
        'zipCode': {
            'zipCode': this.doctors[index].zipCode.zipCode,
            'area': this.doctors[index].zipCode.area,
            'city': this.doctors[index].zipCode.city,
            'state': this.doctors[index].zipCode.state
        },
        "status": this.doctors[index].status,
        'userLogin': {
            'userLoginId' : this.doctors[index].userLogin.userLoginId,
            'email' : this.doctors[index].userLogin.email,
            'password' : this.doctors[index].userLogin.password,
            'userType' : this.doctors[index].userLogin.userType,
            'accountStatus' : this.doctors[index].userLogin.accountStatus,
          }
        };

        this.httpClient.post(this.cloudURL3+'doctor', doctorDetails)
        .subscribe(res => console.log(this.doctorDetails));
  }

  // verifyDoctorValue = function(index) {
    
  //        this.doctors[index].userLogin.accountStatus=1;

  //       let loginData = {
  //               'userLoginId' : this.doctors.userLogin.userLoginId,
  //               'email' : this.doctors.userLogin.email,
  //               'password' : this.doctors.userLogin.password,
  //               'userType' : this.doctors.userLogin.userType,
  //               'accountStatus' : this.doctors.userLogin.accountStatus,
  //           };

  //       this.httpClient.post(this.localURL2+'updateAccountStatus', loginData)
  //       .subscribe(res => console.log(this.loginData));

  //     //alert(index);
  //       this.verifiedDoctor.splice(index, 1);  
  // }
}
