import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SearchDoctorService } from '../services/search-doctor.service';
import{Router} from'@angular/router';

@Component({
  selector: 'app-doctorreg',
  templateUrl: './doctorreg.component.html',
  styleUrls: ['./doctorreg.component.css']
})
export class DoctorregComponent implements OnInit {
form: FormGroup;
server:any=this.service.getServerApiUrl();
  constructor(private httpClient: HttpClient,private service: SearchDoctorService,private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
  // tslint:disable-next-line:max-line-length
  dname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern( /^[a-zA-Z]+[\-\s]?[a-zA-Z.']+[\-\s]?[a-zA-Z.']+$/)])),
  email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),
  // tslint:disable-next-line:max-line-length
  password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,12}$/)])),
  confpassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,12}$/)])),
  usertype: new FormControl('1'),
  userstatus: new FormControl('0'),
  accountstatus: new FormControl('1'),


 });

}

toLogin()
{
  this.router.navigate(['/login']);
}
 


onSubmit() {

      console.log(this.form.value);

// tslint:disable-next-line:prefer-const
let senddata = {  'doctorName': this.form.controls.dname.value,
                  'doctorEmail': this.form.controls.email.value,
                  'doctorPassword': this.form.controls.password.value,
                  'userStatus': this.form.controls.userstatus.value,
                  'userType': this.form.controls.usertype.value,
                  'accountStatus': this.form.controls.accountstatus.value,

              };




      this.httpClient.post(this.server+'signupdoctorfirst', senddata)
    
         .subscribe((data: any[]) => {
            document.getElementById("displaymodal").click();
           console.log(data);
           
         });
}
}

