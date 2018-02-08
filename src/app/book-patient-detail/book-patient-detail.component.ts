import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchDoctorService } from '../services/search-doctor.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatNativeDateModule, MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-book-patient-detail',
  templateUrl: './book-patient-detail.component.html',
  styleUrls: ['./book-patient-detail.component.css']
})
export class BookPatientDetailComponent implements OnInit {

  doctor: any;
  user;
  patientForm: FormGroup;
  dateForm: FormGroup;
  paymentForm: FormGroup;
  date = new Date();
  merge: any[];
  response: any[];
  app: any[];
  todayDate: String;
  position = 'before';

  myslot: any[];
  storeSlotTime: any[];


  b;

  ////// yashswani code//////////////
  form: FormGroup;
  tableData: any[];
  tableDataCheck: boolean = false;
  a = "[]";
  ref: any;
  weekday;
  time;
  fees;
  see: boolean = true;
  /////////////////////
  serverApiUrl;

  constructor(private httpClient: HttpClient, private searchDoctorService: SearchDoctorService, private router: Router, public snackBar: MatSnackBar) {
    if (this.searchDoctorService.backend.userLogin.userType == 1) {
      this.router.navigate(['/']);
      this.snackBar.open("You can't book....Come as a Patient","", {
      duration: 5000,
    });
    }
    if (this.searchDoctorService.getDoctor() != null) {
      console.log("check" + this.searchDoctorService.getDoctor());
      this.doctor = this.searchDoctorService.getDoctor();
      this.weekday = this.doctor.workDays;
      this.time = this.doctor.timeSlot;
      this.fees = this.doctor.fee;
      this.user = this.searchDoctorService.backend;
      this.serverApiUrl = this.searchDoctorService.getServerApiUrl();
    }
    else {
      console.log(this.searchDoctorService.getDoctor());
      this.router.navigate(["/searchDoctor"]);
    }
  }



  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    this.b = this.weekday;
    // Prevent Saturday and Sunday from being selected.
    for (var i = 0; i < this.weekday.length; i++) {

      if (day == this.b[i])
        return true;
    }
    return false;
  }


  ngOnInit() {




    this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/timeslot', { "time": this.time })
      // this.httpClient.post('http://localhost:8080/weHealU/timeslot',{"time":this.time})
      .subscribe((data: any[]) => {
        console.log("check");
        console.log(data);
        this.myslot = data;
        var time = JSON.stringify(data);
        console.log(time);

      })

    ////// yashswani code//////////////
    this.form = new FormGroup({
      file: new FormControl("")
    })

    this.tableData = JSON.parse(this.a);
    //////////////////////////////


    this.patientForm = new FormGroup({
      patientName: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+[\-\s]?[a-zA-Z.']+[\-\s]?[a-zA-Z.']+$/)]),
      age: new FormControl("", [Validators.required, Validators.maxLength(3), Validators.max(130), Validators.pattern(/^[0-9\s]+$/)]),
      symptoms: new FormControl(""),
      gender: new FormControl("", Validators.required),
      patientRelation: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)])
    });

    this.dateForm = new FormGroup({
      appointment_date: new FormControl("", Validators.required),
      appointment_time: new FormControl("")
    });

    this.paymentForm = new FormGroup({
      // nameOnCard: new FormControl("",[Validators.required,Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]+$/)]),
      cardNo: new FormControl("", [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern(/^[0-9\s]+$/)]),
      expDate: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)]),
      cvv: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[0-9\s]+$/)]),
      typeOfCard: new FormControl("", Validators.required),
      bank: new FormControl("", Validators.required)


    });




  }

  isLinear = false;
  // dateTimeForm: FormGroup;




  get gender() {
    return this.patientForm.get('gender')
  }
  get patientRelation() {
    return this.patientForm.get('patientRelation')
  }
  get age() {
    return this.patientForm.get('age');
  }
  get patientName() {
    return this.patientForm.get('patientName');
  }
  get symptoms() {
    return this.patientForm.get('symptoms');
  }
  get appointment_date() {
    return this.dateForm.get('appointment_date');
  }
  get appointment_time() {
    return this.dateForm.get('appointment_time');
  }
  get emailaddr() {
    return this.paymentForm.get('emailaddr')
  }
  get nameOnCard() {
    return this.paymentForm.get('nameOnCard')
  }
  get cardNo() {
    return this.paymentForm.get('cardNo')
  }
  get expDate() {
    return this.paymentForm.get('expDate')
  }
  get cvv() {
    return this.paymentForm.get('cvv')
  }
  get typeOfCard() {
    return this.paymentForm.get('typeOfCard')
  }
  get bank() {
    return this.paymentForm.get('typeOfCard')
  }




  temp: string = "";
  //json1:object={"appointment_date":this.appointment_date };
  onLastSubmit() {
    this.temp = "";
    for (var z = 0; z < this.tableData.length; z++) {
      this.temp += this.tableData[z].fileName + ",";

    }


    var postPat =
      {
        "user": this.user,
        "patientName": this.patientForm.controls.patientName.value,
        "age": this.patientForm.controls.age.value,
        "gender": this.patientForm.controls.gender.value,
        "patientSymptoms": this.patientForm.controls.symptoms.value,

        "userPatientRelation": this.patientForm.controls.patientRelation.value,
        "patientHistory": this.temp,
      }
    console.log("check" + postPat)
    var b = JSON.stringify(postPat);
    var patient = JSON.parse(b);
    console.log(patient);
    var postApp =
      {
        "doctor": this.doctor,
        "appointmentStatus": 1,
        "appointmentDate": this.dateForm.controls.appointment_date.value,
        "appointmentSlot": this.dateForm.controls.appointment_time.value,
        "user": this.user,
        "patientDetails": patient
      }

    console.log(postApp)
    var a = JSON.stringify(postApp);

    var appointment = JSON.parse(a);
    console.log(appointment)




    var result =
      {
        "appointment": appointment,
        "patient": patient
      }

    console.log(result);


    console.log(result);
    var result2 = JSON.stringify(result);
    console.log(result2);


    this.merge = Object.assign(appointment, patient);
    this.httpClient.post('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/appointment', result)
      //this.httpClient.post('http://localhost:8080/weHealU/appointment',result)


      .subscribe((data: any[]) => {
        var a = JSON.stringify(data);
        this.snackBar.open('Your Appointment is Booked', "", {
          duration: 5000,
        });
        this.router.navigate(['/']);
      })


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

    console.log(data)
    //this.httpClient.post('http://localhost:8080/weHealU/upload',data
    this.httpClient.post(this.serverApiUrl + 'upload', data

    )

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


  public delete1(index) {
    this.httpClient.post(this.serverApiUrl + 'delete', { "file_name": this.fname })
      .subscribe((data: any[]) => {
        console.log(data);
      })
    this.tableData.splice(index, 1)
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

  //////////////////////////////////////////////////////////////////


  // {
  //         "userLoginId": 4,
  //         "doctorName": "dhruv",
  //         "contact": "9417820756",
  //         "mciId": "123434",
  //         "experience": "3 to 5 yrs",
  //         "timeSlot": "4-6",
  //         "workDays": "mtwf",
  //         "gender":"1",
  //         "qualifications":"MBBS",
  //         "status": 1,
  //         "subCategory": {
  //             "subCategoryId": 1,
  //             "subCategoryName": "Vascular Surgen",
  //             "category": {
  //                 "categoryId": 1,
  //                 "categoryName": "heart"
  //             }
  //         },
  //         "zipCode": {
  //             "zipCode": 123456,
  //             "area": "Gto Area",
  //             "city": "Gwaliar",
  //             "state": "Madhya Pradesh"
  //         }

  //       },









}