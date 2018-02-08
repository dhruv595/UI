import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { SearchDoctorService } from "../services/search-doctor.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

myform: FormGroup;
email: FormControl;
emailotp:FormControl;
newpassword:FormControl;
confirmpassword:FormControl;
filled=false;
recive:any;
otp: any;
message:string;
mess:string;

//phone: FormControl;
  constructor( private router: Router,private _http:HttpClient,private service:SearchDoctorService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
 createFormControls()
  {
this.email= new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]);
this.emailotp=new FormControl('');
this.newpassword=new FormControl('',[Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,12}$/)]);
this.confirmpassword=new FormControl('',[Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,12}$/)]);
  } 
  createForm()
  {
    this.myform=new FormGroup({
    email:this.email,
    emailotp:this.emailotp,
newpassword:this.newpassword,
confirmpassword:this.confirmpassword

    });
  }   
user()
{
  this.router.navigate(['/patientreg']);
}
doctor()
{
  this.router.navigate(['/doctorreg'])
}
    // click()
    // {
    //    //console.log(this.myform.value);
    //   this.router.navigate(['/login']);
    // }
   storeOTP(data){
     this.filled=true;  
    this.otp=data;
    console.log(this.otp);
   }
   onSubmit()
   { 
    //console.log(this.myform.value.email);
    this.forgotPassword();
}
forgotPassword(){
  var forgot = 
  {
    "email":this.myform.value.email,
    "otp":this.otp
  }
  console.log(forgot);
  this._http.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/forgot',forgot)
  .subscribe(res =>
  {
    this.recive=res;
    console.log(this.myform.value.emailotp);
console.log(this.recive);
  });
  console.log("working");
console.log(this.service.backend);
}
otpcheck()
{
  if (new Date().getTime() - parseInt(localStorage.getItem("tol")) <= 60000 *60 && this.myform.value.emailotp==this.recive)
  {

    console.log(this.myform.value);
    let but=document.getElementById("submitForm");
    but.setAttribute("data-toggle","modal");
    but.setAttribute("data-target","#myModal1");    
    but.setAttribute("data-backdrop","static");
    but.setAttribute("data-dismiss","modal");    
  }
  else
  {
    this.message="Invalid Otp";
  }
}

confimclick()
{
  if(this.myform.value.newpassword==this.myform.value.confirmpassword)
  {
    // this.click();
  var conformpassword = 
  {
    "email":this.myform.value.email,
"newpassword":this.myform.value.confirmpassword
  }
  this._http.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/newpassword',conformpassword)

  .subscribe(newpass => {
console.log(newpass);
  });
  this.router.navigate(['/login']);   
  console.log(this.myform.value);
    let but=document.getElementById("datamodal");
    but.setAttribute("data-toggle","modal");
    but.setAttribute("data-target","#myModal1"); 
    but.setAttribute("data-backdrop","false");   
    but.setAttribute("data-dismiss","modal"); 
}
 else
  {
    this.mess="Password Miss Match";
  }
}
rememberotp()
{
  localStorage.setItem("tol", new Date().getTime().toString());
}
}

