import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ReactiveFormsModule,FormsModule} from '@angular/forms' 
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { SearchDoctorService } from '../services/search-doctor.service';


@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css']
})
export class MiddleComponent implements OnInit {

  serverApiUrl:string;
  searchForm:FormGroup;
  showDropDown:boolean=false;  
  categories;

  constructor(private httpClient:HttpClient, private searchDoctorService:SearchDoctorService) {
      this.serverApiUrl = this.searchDoctorService.getServerApiUrl(); 
   }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search : new FormControl("")
    })

// Actual data to use when backend is ready 
    this.httpClient.get(this.serverApiUrl+'category')
      .subscribe(
        (data:any[]) => {
         console.log(data)
          this.categories=data;
        }
      )

  }

  toggleDown(){ 
    this.showDropDown=true;
  }
  toggleUp(){
    this.showDropDown=false;
  }

  getSearchValue(){
   // console.log(this.searchForm.value.search);
    return this.searchForm.value.search;
  }

  selectValue(category:any){
    console.log("submit")
    console.log(category.categoryId+" "+category.categoryName);
    this.searchDoctorService.setCategoryId(category.categoryId);
  }

}
