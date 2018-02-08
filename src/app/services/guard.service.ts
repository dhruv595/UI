import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SearchDoctorService } from '../services/search-doctor.service';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private router: Router, private searchDoctor: SearchDoctorService) { }

  canActivate() {
    if (this.searchDoctor.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
