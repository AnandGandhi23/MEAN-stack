import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.scss']
})
export class StudentListingComponent {
  students: any = [];
  constructor(private studentService: StudentService, public router: Router) {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getAllStudents().subscribe((res: any) => {
      this.students = res.students;
    });
  }

  onPreview(id: string) {
    this.router.navigate([`/previewStudent/${id}`]);
  }

  onEdit(id: string) {
    this.router.navigate([`/editStudent/${id}`]);
  }

  onDelete(id: string) {
    if (confirm('Are you sure want to delete')) {
      this.studentService.deleteStudent(id).subscribe((res: any) => {
        if (res.status === 'success') {
          this.students = this.students.filter(
            (record: any) => record._id !== id
          );
        }
      });
    }

  }
}


