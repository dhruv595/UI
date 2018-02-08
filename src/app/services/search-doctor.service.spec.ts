import { MiddleComponent } from './../landing page/middle.component';
import { TestBed, inject } from '@angular/core/testing';

import { SearchDoctorService } from './search-doctor.service';



fdescribe('SearchDoctorService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchDoctorService],
      declarations: [ 
         MiddleComponent,
        
      ]
    });
  });

  it('should be created', inject([SearchDoctorService], (service: SearchDoctorService) => {
    expect(service).toBeTruthy();
  }));

   it('server url', inject([SearchDoctorService], (service: SearchDoctorService) => {
    expect(service.getServerApiUrl()).toBe('https://cors-anywhere.herokuapp.com/https://wehealuservice.azurewebsites.net/weHealU/');
  }));


    it('should have isLoggedInFunction', inject([SearchDoctorService], (service: SearchDoctorService) => {
    expect(service.isLoggedIn).toBeTruthy();
  }));
});
