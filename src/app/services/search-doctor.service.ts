import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SearchDoctorService {

  private serverApiUrl = new BehaviorSubject<string>("https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/");
  // private serverApiUrl = new BehaviorSubject<string>("https://cors-anywhere.herokuapp.com/https://localhost:8080/weHealU/");
  private categoryId = new BehaviorSubject<number>(0);
  private doctor = new BehaviorSubject<any>(null);
  //cast = this.category_id.asObservable();
  //  cast1 = this.doctor.asObservable();
  
  backend;
  toggleLog:boolean;
  doctorId:any;
  
  constructor() { 
    this.backend=JSON.parse(localStorage.getItem("loggedUser"));
    console.log(this.backend);
    if(this.backend)
    {
      this.toggleLog=false;
    }
    else
    {
      this.toggleLog=true;
    }
  }
  setCategoryId(categoryId){
    this.categoryId.next(categoryId);
  
   console.log(this.categoryId.value);
  }

  getCategoryId(){
    return this.categoryId.value;
  }

  setDoctor(doctor:any){
    this.doctor.next(doctor);
    console.log(this.doctor.value);
  }
  
  getDoctor(){
    return this.doctor.value; 
  }

  isLoggedIn(){
    if(this.backend) {
      return true;
    }else {
     return false;
    }
  }

  getServerApiUrl(){
    return this.serverApiUrl.value;
  }

}
