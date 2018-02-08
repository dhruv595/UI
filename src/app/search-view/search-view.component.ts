import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ReactiveFormsModule,FormsModule} from '@angular/forms' 
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { ClickOutsideDirective } from '../landing page/click-outside.directive';
import { SearchFilterPipe } from '../landing page/search-filter.pipe';
import { SearchDoctorService } from '../services/search-doctor.service';
import { GuardService } from '../services/guard.service';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {


  serverApiUrl:string;
  //localUrl:string = "http://localhost/";
  //actualUrl:string = "https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/"; 
  searchPlaceholder:string="Search Doctor by Speciality Domain";
  searchForm:FormGroup;
  filterForm:FormGroup;
  showDropDown:boolean=false;
  doctors;
  categories:any[];
  subCategories;
  zipcodes;
  categoryId:number=0;  // Fetch its value from service
  
//------------------------------------
  
  constructor(private httpClient:HttpClient, private searchDoctorService : SearchDoctorService, private router:Router, private check: GuardService,private snackBar:MatSnackBar ) {
  if(this.searchDoctorService.backend.userLogin.userType==1)
  {
    this.router.navigate(['/']);    
     this.snackBar.open("You can't book....Come as a Patient","", {
      duration: 5000,
    });
  }
  this.serverApiUrl=this.searchDoctorService.getServerApiUrl();
  this.categoryId = this.searchDoctorService.getCategoryId();
  this.callCategoryApi();
  this.callZipcodeApi();
  console.log(this.categoryId);
  if(this.categoryId!=0){
    this.callDoctorApi(this.categoryId)
    this.callSubCategoryApi(this.categoryId);
   }
  }

  ngOnInit() {
    
    this.searchForm = new FormGroup({
      search : new FormControl("")
    })

    this.filterForm = new FormGroup({
      zipCode : new FormControl(""),
      gender : new FormControl(""),
      sub_category_id : new FormControl("")
    })

  }

//-------------------------------------------
  toggleDown(){ 
    this.showDropDown=true;
  }

  toggleUp(){
    this.showDropDown=false;
  }

  //----------------- Getter And Setter -------------------------------------------------------------------

  getSearchValue(){
  //  console.log(this.searchForm.value.search);
    return this.searchForm.value.search;
  }

  selectValue(category:any){
    //   MAKE THESE CHANGES  this.filteForm.controls.search.
    this.categoryId = category.categoryId;
    this.searchPlaceholder=category.categoryName;
    this.toggleUp();
    this.callDoctorApi(category.categoryId);
    this.callSubCategoryApi(category.categoryId)
  }

  getFilterForm(){
    return this.filterForm;
  }

  //---------------------------------------------------------------------------------

  callDoctorApi(categoryId){
      this.httpClient.get(this.serverApiUrl+'doctor?categoryId='+categoryId)
      //this.httpClient.get('http://localhost:8080/weHealU/doctor?categoryId='+categoryId)
       .subscribe((data:any[]) => {
        this.doctors = data;
      })
  }

  callCategoryApi(){
  this.httpClient.get(this.serverApiUrl+'category')
  //this.httpClient.get('http://localhost:8080/weHealU/category')
      .subscribe(
        (data:any[]) => {
          this.categories=data;
        })
  }

  callSubCategoryApi(categoryId:number){
    this.httpClient.get(this.serverApiUrl+'subcategory?categoryId='+categoryId)
   // this.httpClient.get('http://localhost:8080/weHealU/subcategory?categoryId='+categoryId)
        .subscribe((data:any[]) => {
          this.subCategories=data;
        })
  }

  callZipcodeApi(){
    this.httpClient.get(this.serverApiUrl+'zipcodes')
        .subscribe((data:any[]) => {
          this.zipcodes=data;
        })
  }

//----------------------- Testing new code ---------------------------------------------


  BookAppointment(doctor:any){
    if(this.check.canActivate())
    {
    this.searchDoctorService.setDoctor(doctor);
    this.router.navigate(['searchDoctor/booking']);
    }
  }

  submitFilter(f){
    console.log(f)
    this.callDoctorApi(this.categoryId);
  }

  clearfilter(){
   this.filterForm.controls.zipCode.reset("");
    this.filterForm.controls.sub_category_id.reset("");
    this.filterForm.controls.gender.reset("");
    this.callDoctorApi(this.categoryId);
  }
}
