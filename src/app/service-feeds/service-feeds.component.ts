import { SearchDoctorService } from './../services/search-doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-service-feeds',
  templateUrl: './service-feeds.component.html',
  styleUrls: ['./service-feeds.component.css']
})
export class ServiceFeedsComponent implements OnInit {

  private url_local = 'http://localhost:8081/weHealU/feedback/review';
  private url_cloud = 'https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/feedback/review';
  form: FormGroup;
  feedbackRating: FormControl;
  feedbackStatement: FormControl;
  feeddbackService: FormControl;
  feedbackSuggestion: FormControl;
  dummydata: Object;
  constructor(private http: Http,private service:SearchDoctorService) { }

  ngOnInit() {
    this.form = new FormGroup({
      feedbackRating: new FormControl('', Validators.required),
      feedbackStatement: new FormControl('', Validators.required),
      feedbackService: new FormControl('', Validators.required),
      feedbackSuggestion: new FormControl('', Validators.required)
    });
  }

  onSubmit = (rate) => {

    this.dummydata = {

      'user': {'userLoginId':this.service.backend.userLoginId},
      'feedbackRating': this.form.controls.feedbackRating.value,
      'feedbackStatement': this.form.controls.feedbackStatement.value,
      'feedbackService': this.form.controls.feedbackService.value,
      'feedbackSuggestion': this.form.controls.feedbackSuggestion.value,
      'doctor': {'userLoginId':this.service.doctorId}
    };
    console.log(this.dummydata);
    this.http.post(this.url_cloud, this.dummydata).subscribe(res => console.log(this.dummydata));
    this.form.reset();
  }

}
