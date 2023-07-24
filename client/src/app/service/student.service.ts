import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getAllStudents() {
    return this.http.get(`http://localhost:4100/student/get-all-students`);
  }

  getStudentById(id: string): Promise<APIResponse | undefined> {
    return this.http
      .get<APIResponse>(`http://127.0.0.1:4100/student/getstudentbyid/${id}`)
      .toPromise();
  }

  createStudent(studentData: any) {
    return this.http.post(
      `http://127.0.0.1:4100/student/createstudent`,
      studentData
    );
  }

  deleteStudent(id: string) {
    return this.http.delete(
      `http://127.0.0.1:4100/student/deleteStudent/${id}`
    );
  }
}
