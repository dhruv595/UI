import { Component, OnInit } from '@angular/core';
import { SearchDoctorService } from '../services/search-doctor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-doctorhomepage',
  templateUrl: './doctorhomepage.component.html',
  styleUrls: ['./doctorhomepage.component.css']
})
export class DoctorhomepageComponent implements OnInit {
name:any;
mciid:any;
email:any;
qualification:any;
experience:any;
specialization:any;
phone:any;
time:any;
address1:any;
address2:any;
address3:any;
workingdays:any;
toggleEditView:boolean=false;
fee:any;
workingdaysprint:String="";
updateDoctorForm:FormGroup;
a:string;
b ;
f;
t; 
  constructor( private service: SearchDoctorService, private httpClient:HttpClient) {
    this.name=this.service.backend.doctorName;
     this.mciid=this.service.backend.mciId;
     this.email=this.service.backend.userLogin.email;
     this.qualification=this.service.backend.qualifications;
     this.time=this.service.backend.timeSlot;
     this.fee=this.service.backend.fee;
     this.experience=this.service.backend.experience;
     this.specialization=this.service.backend.subCategory.subCategoryName;
     this.phone=this.service.backend.contact;
     this.address1=this.service.backend.zipCode.area;
     this.address2=this.service.backend.zipCode.city;
     this.address3=this.service.backend.zipCode.state;
    
     this.workingdays=this.service.backend.workDays;
     console.log(this.workingdays.length);
     
    
    
      for(let i=0;i<this.workingdays.length;i++)
      {
     
     if(this.workingdays.charAt(i)=='0')
     this.workingdaysprint=this.workingdaysprint+" Sun ";
    
     if(this.workingdays.charAt(i)==1)
     this.workingdaysprint=this.workingdaysprint+" Mon";
     
     if(this.workingdays.charAt(i)==2)
     this.workingdaysprint=this.workingdaysprint+" Tue";
    
     if(this.workingdays.charAt(i)==3)
     this.workingdaysprint=this.workingdaysprint+" Wed";
     
     if(this.workingdays.charAt(i)==4)
     this.workingdaysprint=this.workingdaysprint+" Thr";
     
     if(this.workingdays.charAt(i)==5)
     this.workingdaysprint=this.workingdaysprint+" Fri";
     
     if(this.workingdays.charAt(i)==6)
     this.workingdaysprint=this.workingdaysprint+" Sat";
     
     if(i<this.workingdays.length-1)this.workingdaysprint = this.workingdaysprint + ", "
     
    
     }
     this.a = this.time;
    this.b = this.a.split(' - ');
    this.f = this.b[0];  
    this.t = this.b[1];
     this.updateDoctorForm = new FormGroup({
       contact : new FormControl(this.phone,Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[7-9]{1}\d{9}$/)])),
       qual: new FormControl(this.qualification,Validators.compose([Validators.required, Validators.minLength(1)])),
       exp : new FormControl(this.experience, Validators.compose([Validators.required, Validators.minLength(1)])),
       fee: new FormControl(this.service.backend.fee,Validators.compose([Validators.required, Validators.minLength(1)])),
       fromtime: new FormControl(this.f, Validators.compose([Validators.required, Validators.minLength(1)])),
       totime: new FormControl(this.t, Validators.compose([Validators.required, Validators.minLength(1)]))
      })

   }
  
  ngOnInit() {

    
  }

  toggleEdit(){
    this.toggleEditView=!this.toggleEditView;
  }

  submitUpdate(form){
    console.log(this.service.backend);
    console.log(form.qual)
    console.log(form.exp)
    var newTimeSolt:string = form.fromtime+" - "+form.totime;
    console.log(newTimeSolt)
    const postdoc = {
      "userLoginId" : this.service.backend.userLoginId,
      "doctorName": this.service.backend.doctorName,
      "contact": form.contact,
      "mciId": this.service.backend.mciId,
      "experience": form.exp,
      "timeSlot": newTimeSolt,
      "workDays": this.service.backend.workDays,
      "gender": this.service.backend.gender,
      "fee": form.fee,
      "qualifications": form.qual,
      "subCategory": this.service.backend,
      "zipCode": this.service.backend.zipCode,
      "status": 1,
      "userLogin": this.service.backend.userLogin
    };
    this.service.backend.contact=form.contact;
    this.service.backend.qualifications=form.qual;
    this.service.backend.experience=form.exp;
    this.service.backend.fee=form.fee;
    this.service.backend.timeSlot=newTimeSolt;
    this.time=newTimeSolt;
    console.log(postdoc);
    this.phone=form.contact;
    this.httpClient.post(this.service.getServerApiUrl()+'doctor',postdoc)
    .subscribe((data:any[]) => {
      localStorage.setItem("loggedUser", JSON.stringify(this.service.backend));
    })
      
    this.toggleEdit();  
  }

  cancelEdit(){
    this.updateDoctorForm.controls.exp.reset(this.experience);
    this.updateDoctorForm.controls.qual.reset(this.qualification);
    this.updateDoctorForm.controls.contact.reset(this.phone);
    this.updateDoctorForm.controls.fee.reset(this.service.backend.fee);
    this.updateDoctorForm.controls.fromtime.reset(this.f);
    this.updateDoctorForm.controls.totime.reset(this.t);
    this.toggleEditView=!this.toggleEditView;

  }

}
