import { FooterComponent } from './../footer/footer.component';
import { HeaderComponent } from './../header/header.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AppointmentListComponent } from './appointment-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatSnackBarModule, MatDialogModule, MatTooltipModule,
  MatSortModule, MatPaginatorModule, MatButtonModule,
  MatStepperModule, MatFormFieldModule, MatFormFieldControl,
  MatInputModule, MatTableModule, MatDatepickerModule,
  MatNativeDateModule, MatCardModule
} from '@angular/material';
import { MaterialModule } from './../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from "@angular/common/http";
import { SearchDoctorService } from "../services/search-doctor.service";
import { By }  from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('AppointmentListComponent', () => {
  let component: AppointmentListComponent;
  let fixture: ComponentFixture<AppointmentListComponent>;
  let f:DebugElement;
  let e:HTMLElement;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      providers: [SearchDoctorService,],
      imports: [MaterialModule, RouterTestingModule, HttpClientModule,BrowserAnimationsModule],
      declarations: [AppointmentListComponent,
        HeaderComponent,
        FooterComponent]
    })
      .compileComponents();
      
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(AppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', ( )=> {
  
  
  // fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should createdddd', ( )=> {
  
  
    f=fixture.debugElement.query(By.css('p'));
    e=f.nativeElement
    expect(e.textContent).toBe('*Click on the row for Feedback');
  });
});

