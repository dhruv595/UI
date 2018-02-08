import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

import { SearchDoctorService } from '../services/search-doctor.service';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrls: ['./userhomepage.component.css']
})
export class UserhomepageComponent implements OnInit {
  ////// yashswani code//////////////
  form: FormGroup;
  tempTable: any[] = [];
  tableData: any[] = [];
  tableDataCheck: boolean = true;
  a = "[]";
  ref: any;
  weekday;
  time;
  see: boolean = true;
  serverApiUrl;
  /////////////////////

  updateUserForm: FormGroup;
  toggleEditView: boolean = false;
  constructor(private httpClient: HttpClient, private router: Router, private service: SearchDoctorService) {
    this.serverApiUrl = this.service.getServerApiUrl();
    console.log(this.service.backend);

    this.httpClient.post(this.serverApiUrl + 'getUploadHistory', this.service.backend)
    //this.httpClient.post('http://localhost:8080/weHealU/getUploadHistory', this.service.backend)
      .subscribe((data: any[]) => {
        console.log(data.length);
        for (var a = 0; a < data.length; a++) {
          this.tableData.push({ "fileName": data[a].file });
          console.log(this.tableData);
        }
      })


  }

  // history()
  // {
  //   this.getHistory();
  // }
  // getHistory()
  // {


  //   for(var a=0;a<this.tempTable.length;a++)
  //   {
  //     this.tableData.push(this.tempTable[a]);
  //   }
  //   console.log(this.tableData);

  // }


  openAppointment() {
    this.router.navigate(['searchDoctor/booking']);
  }


  name = this.service.backend.userName;
  email = this.service.backend.userLogin.email;
  phone = this.service.backend.userContact;
  aadhar = this.service.backend.userAadhar;

  ngAfterContentInit() {

  }
  ngOnInit() {




    this.updateUserForm = new FormGroup({

      email: new FormControl(this.email, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),
      contact: new FormControl(this.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[7-9]{1}\d{9}$/)])),
      aadhar: new FormControl(this.aadhar, Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern(/^[0-9]{12}$/)]))
    })
    ////// yashswani code//////////////
    this.form = new FormGroup({
      file: new FormControl("")
    })

    this.tableData = JSON.parse(this.a);
    ////////////////////////////// 
  }
  //// ANIMESH /////////////////////////////
  toggleEdit() {
    this.toggleEditView = !this.toggleEditView;
  }

  /////////////////////////////yashswani code////////////////////////////////
  fname: String;
  fpath: String;
  uploadFile: any;
  c;

  public uploadImage(event: any) {


    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.uploadFile = event.target.files[0];
      this.fname = this.uploadFile.name;

      reader.readAsDataURL(this.uploadFile);
      this.c = reader.onload = () => {



        return reader.result;
      };
      console.log(event.target.value);
      console.log(reader);
      console.log(this.fname);
      console.log(this.fpath);

      if (this.fname != "") {
        this.see = false;
      }
      else {
        this.see = true;
      }
    }

  }

  public onUpload() {


    var data = {
      "file_path": this.c(),
      "file_name": this.fname
    }

    
    console.log("link  " + this.serverApiUrl)
    //this.httpClient.post('http://localhost:8080/weHealU/upload',data
    this.httpClient.post(this.serverApiUrl + 'upload', data

    )
      .subscribe((data: any[]) => {
        console.log(data);
      })

    //this.httpClient.post(this.serverApiUrl + 'upload', data)
    let a = this.service.backend;
    a.userName = this.fname;
    console.log(a);
    this.httpClient.post(this.serverApiUrl + 'uploadHistory', a)
    //this.httpClient.post('http://localhost:8080/weHealU/uploadHistory', a)
      .subscribe((data: any[]) => {
        console.log(data);
      })

    console.log(this.form.valid)
    this.refreshList()
    this.see = true;

    document.getElementById('selectfile').innerText = "";

    this.tableDataCheck = true;
    this.form.reset();


  }


  public delete1(index,name) {
    this.httpClient.post(this.serverApiUrl + 'delete', { "file_name": this.fname })
      .subscribe((data: any[]) => {
        console.log(data);
      })
    this.tableData.splice(index, 1);
    //this.httpClient.post(this.serverApiUrl + 'upload', data)
    let a = this.service.backend;
    a.userName = name;

    this.httpClient.post(this.serverApiUrl + 'deleteUploadHistory', a)
    //this.httpClient.post('http://localhost:8080/weHealU/deleteUploadHistory', a)
      .subscribe((data: any[]) => {
        console.log(data);
      })

    if (this.tableData.length == 0) this.tableDataCheck = false;

  }

  public refreshList() {
    this.tableData.push({ "fileName": this.fname });
    console.log(this.fname);
    console.log(this.tableData);

  }
  public reset1() {
    this.fname = '';
    // this.;
  }


  //   Animesh update user details form submit method //


  sumbitUpdate(formData) {
    //   alert("called");
    //  console.log(formData);
    //console.log(this.service.backend);
    var data = {
      userLoginId: this.service.backend.userLogin.userLoginId,
      userName: this.service.backend.userName,
      userContact: formData.contact,
      userAadhar: this.service.backend.userAadhar
    }

    this.service.backend.userContact = formData.contact;
    //console.log(this.service.backend)
    this.phone = formData.contact;

    //console.log(data);
    this.httpClient.post(this.serverApiUrl + 'user', data)
      .subscribe((data: any[]) => {
        localStorage.setItem("loggedUser", JSON.stringify(this.service.backend));
        // console.log(localStorage.getItem("loggedUser"))

        this.toggleEditView = !this.toggleEditView;

      })
  }


}
