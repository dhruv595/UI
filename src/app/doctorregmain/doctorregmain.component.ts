import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchDoctorService } from '../services/search-doctor.service';
import{Router} from'@angular/router';

// M1043042
// Siddesh

@Component({
  selector: 'app-doctorregmain',
  templateUrl: './doctorregmain.component.html',
  styleUrls: ['./doctorregmain.component.css']
})
export class DoctorregmainComponent implements OnInit {
  total: any;
  time1: any;
  time2: any;
  form: FormGroup;
  subcategories: any[];
  sub_c: any; 
  responseSubcategories;
   server:any=this.service.getServerApiUrl();
  constructor(private httpClient: HttpClient, private service: SearchDoctorService,private router: Router) {
  }

 ngOnInit() {

    this.form = new FormGroup({
      // tslint:disable-next-line:max-line-length
      mciid: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(/^[A-Za-z0-9-]*$/)])),
      phoneno: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[7-9]{1}\d{9}$/)])),
      exp: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
      gen: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
      workmon: new FormControl(''),
      worktue: new FormControl(''),
      workwed: new FormControl(''),
      workthr: new FormControl(''),
      workfri: new FormControl(''),
      worksat: new FormControl(''),
      worksun: new FormControl(''),
      qual: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
      fromtime: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
      totime: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
      fee:new FormControl('',Validators.compose([Validators.required, Validators.minLength(1)])),

      // tslint:disable-next-line:max-line-length
      area: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.pattern(/^[ A-Za-z0-9./#-,\s]*$/)])),
      zip: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^[1-9][0-9]{5}$/)])),

      // tslint:disable-next-line:max-line-length
      city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]+$/)])),

      // tslint:disable-next-line:max-line-length
      state: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z\s]+$/)])),
       sub_category: new FormControl('', Validators.compose([Validators.required])),
      userstatus: new FormControl('1')
    });


   this.httpClient.get(this.server+'subcategories')
 
      .subscribe((subData: any[]) => {
        this.subcategories = subData;
        console.log(this.subcategories);
      });


  }




  

toHome()
{
  this.router.navigate(['/']);
}
  // tslint:disable-next-line:member-ordering
  working_days: String= '';



  onSubmit()  {
    console.log(this.form.value);
    // tslint:disable-next-line:no-construct
    this.time1 = new String(this.form.get('fromtime').value);
    // tslint:disable-next-line:no-construct
    this.time2 = new String(this.form.get('totime').value);
    this.total = this.time1.concat(' ' + '-' + ' ', this.time2);
    console.log(this.total);


    if (this.form.get('workmon').value) {
      this.working_days = '1';
    }
    // tslint:disable-next-line:curly
    if (this.form.get('worktue').value)
      this.working_days = this.working_days + '2';
    // tslint:disable-next-line:curly
    if (this.form.get('workwed').value)
      this.working_days = this.working_days + '3';
    // tslint:disable-next-line:curly
    if (this.form.get('workthr').value)
      this.working_days = this.working_days + '4';
    // tslint:disable-next-line:curly
    if (this.form.get('workfri').value)
      this.working_days = this.working_days + '5';
    // tslint:disable-next-line:curly
    if (this.form.get('worksat').value)
      this.working_days = this.working_days + '6';
    // tslint:disable-next-line:curly
    if (this.form.get('worksun').value)
      this.working_days = this.working_days + '0';
    console.log(this.working_days);

   this.sub_c = JSON.parse(this.form.get('sub_category').value);

    

    const postdoc = {
      'doctorLoginId': this.service.backend.userLoginId,
      'doctorName': this.service.backend.doctorName,
      'doctorGender': this.form.controls.gen.value,
      'doctorStatus': this.form.controls.userstatus.value,
      'doctorQualification': this.form.controls.qual.value,
      'doctorZip': this.form.controls.zip.value,
      'doctorContact': this.form.controls.phoneno.value,
      'doctorExp': this.form.controls.exp.value,
      'doctorMciid': this.form.controls.mciid.value,
      'doctorTime': this.total,
      'doctorFee':this.form.controls.fee.value,
      'doctorWorkdays': this.working_days,
      'doctorArea': this.form.controls.area.value,
      'doctorCity': this.form.controls.city.value,
      'doctorState': this.form.controls.state.value,
      'subcategory': this.sub_c
    };


console.log(postdoc);
    
   this.httpClient.post(this.server+'signupdoctorsecond', postdoc)
   


      .subscribe((data: any[]) => {
       document.getElementById("displaymodal").click();
       this.service.backend=data;
        localStorage.setItem("loggedUser", JSON.stringify(this.service.backend));
        console.log(data);
        
      });
  }
}




