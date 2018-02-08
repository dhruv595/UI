import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { SearchDoctorService } from '../services/search-doctor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patientreg',
  templateUrl: './patientreg.component.html',
  styleUrls: ['./patientreg.component.css']
})
export class PatientregComponent implements OnInit {


  form: FormGroup;
  server: any;
  email:boolean=false;
  constructor(private httpClient: HttpClient, private service: SearchDoctorService, private router: Router) {
    this.server = this.service.getServerApiUrl();
  }

  ngOnInit() {


    this.form = new FormGroup({

      uname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+[\-\s]?[a-zA-Z.']+[\-\s]?[a-zA-Z.']+$/)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),

      aadharno: new FormControl('', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern(/^[0-9]{12}$/)])),
      contactno: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[7-9]{1}\d{9}$/)])),

      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,12}$/)])),
      confpassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,12}$/)])),
      usertype: new FormControl('0'),
      userstatus: new FormControl('1'),

    });



  }

  toLogin() {
    this.router.navigate(['/login']);
  }





  onSubmit = () => {
    console.log(this.form.value);


    const data = {
      'userName': this.form.controls.uname.value,
      'userAadhar': this.form.controls.aadharno.value,
      'userContact': this.form.controls.contactno.value,
      'userEmail': this.form.controls.email.value,
      'userPassword': this.form.controls.password.value,
      'userStatus': this.form.controls.userstatus.value,
      'userType': this.form.controls.usertype.value
    };




   this.httpClient.post(this.server + 'signupuser', data)
     //this.httpClient.post('http://localhost:8080/weHealU/signupuser',data)
      .subscribe((data: any[]) => {
        if(data!=null)
        {
          document.getElementById("displaymodal").click();
        }
        else
        {
            this.email=true;
        }
        console.log(data);

      });




  }
}
