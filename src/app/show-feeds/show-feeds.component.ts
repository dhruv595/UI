import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { SearchDoctorService } from '../services/search-doctor.service';
@Component({
  selector: 'app-show-feeds',
  templateUrl: './show-feeds.component.html',
  styleUrls: ['./show-feeds.component.css']
})
export class ShowFeedsComponent implements OnInit {
   posts: any[]= [{}];

  constructor(private http: Http, private searchDoctor: SearchDoctorService) { }

  ngOnInit() {
    this.show();
  }
  // tslint:disable-next-line:one-line
  show(){
    if (this.searchDoctor.isLoggedIn()) {
       this.http.get('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/feedback/servicereview')
    .subscribe(response => {
      this.posts = response.json();
      console.log(this.posts);
    }
  );
    }else {

      this.http.get('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/feedback/reviewlog')
    .subscribe(response => {
      this.posts = response.json();
      console.log(this.posts);
    }
  );

    }
}
}
/*
view feedbacks

 this.http.get('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/feedback/servicereview')
    .subscribe(response => {
      this.posts = response.json();
      console.log(this.posts);
    }
  );

*/