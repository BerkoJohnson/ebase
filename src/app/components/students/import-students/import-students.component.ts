import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-import-students',
  templateUrl: './import-students.component.html',
  styleUrls: ['./import-students.component.css']
})
export class ImportStudentsComponent implements OnInit {
  selectedFile: File;
  selectedRoom: string;
  rooms$;
  students;
  yearOfAdmission = '';
  addYearOfAdmission = false;

  constructor(private roomService: RoomService, private studentService: StudentService) { }

  ngOnInit() {
    this.rooms$ = this.roomService.rooms$;
  }

  get years() {
    let startYear = 1970;
    let endYear = new Date().getFullYear();
    let yrs = [];

    while(startYear <= endYear) {
      yrs.push(startYear);
      startYear++;
    }
    return yrs;
  }

  onAddYearOfAdmission(event: Event) {
    this.addYearOfAdmission = event.target['checked'];
  }

  onChange(event: Event) {
    this.selectedFile = event.target['files'][0];
  }

  onSelectYear(event: Event) {
    this.yearOfAdmission = event.target['value'];
  }

  onSelectRoom(event: Event) {
    this.selectedRoom = event.target['value'];
  }

  uploadData() {
    const formData = new FormData();
    formData.append('yearOfAdmission', this.yearOfAdmission);
    formData.append('room', this.selectedRoom);
    formData.append('file', this.selectedFile, this.selectedFile.name);
    return formData;
  }

  uploadFile() {
    this.studentService
    .addMultipleStudent(this.uploadData())
    .subscribe(docs => this.students = docs);
  }
}
