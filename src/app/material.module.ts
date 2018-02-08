import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatSnackBarModule,MatDialogModule,MatTooltipModule,
   MatSortModule, MatPaginatorModule, MatButtonModule, 
   MatStepperModule, MatFormFieldModule, MatFormFieldControl, 
   MatInputModule, MatTableModule, MatDatepickerModule,
    MatNativeDateModule,MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule],

  exports: [
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule],
})
export class MaterialModule { }