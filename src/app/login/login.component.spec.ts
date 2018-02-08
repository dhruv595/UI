import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SearchDoctorService } from "../services/search-doctor.service";


import { LoginComponent } from './login.component';
import { HeaderComponent } from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import { RouterTestingModule } from "@angular/router/testing";

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule, RouterTestingModule,HttpClientModule, FormsModule],
      declarations: [ LoginComponent ,HeaderComponent,FooterComponent],
      providers:[SearchDoctorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
   it('should create', () => {
    expect(component.call).toBeTruthy();

  });
  it('should function', () => {
    expect(component.call()).toBe('string');

  });
});
