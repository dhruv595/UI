import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SearchDoctorService } from "../services/search-doctor.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform: FormGroup;
  name: FormControl;
  password: FormControl;
  message: string;
  Email;
  em;
  pass;
  fp = true;
  constructor(private _http: HttpClient, private router: Router, private service: SearchDoctorService) { }
  ngOnInit() {
    //document.getElementById('pass').style.background = 'url("../assets/image/showPass.png")';

    // 
    if (new Date().getTime() - parseInt(localStorage.getItem("tol")) >= 60000 * 60 * 24) {
      localStorage.setItem("currentuser", "");
      localStorage.setItem("pass", "");
    }
    this.Email = localStorage.getItem("currentuser");
    this.pass = localStorage.getItem("pass");
    this.createFormControls();
    this.createForm();
    // this.em=this.myform.value.email;
  }
  createFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }
  createForm() {
    //console.log(this.email);
    this.myform = new FormGroup({
      name: this.name,
      password: this.password
    });
  }

  rememberMe() {
    localStorage.setItem("currentuser", this.myform.value.email);
    localStorage.setItem("pass", this.myform.value.password);
    localStorage.setItem("tol", new Date().getTime().toString());
    this.Email = localStorage.getItem("currentuser");
    this.pass = localStorage.getItem("pass");
  }
  call() {
    alert("Please Enter Email Id");
    this.fp = false;
    return "string";
  }
  user() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.name.valid && this.password.valid) {
      var data = {
        "email": this.myform.value.name,
        "password": this.myform.value.password
      }
      this._http.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/login', data)
    // this._http.post('http://localhost:8080/weHealU/login', data)
      
        .subscribe(dat => {
          console.log(dat);
          console.log(dat);
          this.service.backend = dat;
          if (this.service.backend == false) {
            this.message = "Username or Password Invalid";
            console.log(this.message);
          }
          else if (this.service.backend == true) {
            this.message = "Username or Password Invalid";
            console.log(this.message);
          }
           else if (this.service.backend.userType == "2") {
            this.service.toggleLog = !this.service.toggleLog;
            localStorage.setItem("loggedUser", JSON.stringify(this.service.backend));
            console.log("dhriv");
            console.log(this.service.backend);
            console.log(this.service.toggleLog);
            this.router.navigate(['/adminhomepage']);
          }
          else if ((this.service.backend.userLogin.userType == "0" && this.service.backend.userLogin.accountStatus=="1") ) {
            this.service.toggleLog = !this.service.toggleLog;
            localStorage.setItem("loggedUser", JSON.stringify(this.service.backend));
            console.log(dat);
            this.message = "Welcome to we heal u, Login status: " + localStorage.getItem("loggedin");
            console.log(this.message);
            // alert('Welcome,you are logged in');
            this.router.navigate(['/']);
          }
          else if (this.service.backend.userLogin.userType == "1" &&  this.service.backend.userLogin.accountStatus=="1") {
            this.service.toggleLog = !this.service.toggleLog;
            localStorage.setItem("loggedUser", JSON.stringify(this.service.backend));
            if (this.service.backend.status == "0") {
              this.router.navigate(['/doctorregmain']);
            
            }
            else {
              this.service.toggleLog = this.service.toggleLog;
              localStorage.setItem("loggedUser", JSON.stringify(this.service.backend));
              this.message = "Welcome to we heal u, Login  doctor: " + localStorage.getItem("loggedin");
              console.log(this.message);
              // alert('welcome,you are logged in');
              this.router.navigate(['/']);
            }
          }
         
          else {
            this.message = "Username or Password Invalid";
            console.log(this.message);
          }
        });
    }
  }
}
