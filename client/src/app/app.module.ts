import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentListingComponent } from './component/student-listing/student-listing.component';
import { CreateStudentComponent } from './component/create-student/create-student.component';
import { PreviewStudentComponent } from './component/preview-student/preview-student.component';

@NgModule({
  declarations: [AppComponent, StudentListingComponent, CreateStudentComponent, PreviewStudentComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
