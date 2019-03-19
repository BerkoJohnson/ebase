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

  constructor(private roomService: RoomService, private studentService: StudentService) { }

  ngOnInit() {
    this.rooms$ = this.roomService.rooms$;
  }

  onChange(event: Event) {
    this.selectedFile = event.target['files'][0];
  }

  onSelectRoom(event: Event) {
    this.selectedRoom = event.target['value'];
  }
  uploadData() {
    const formData = new FormData();
    formData.append('room', this.selectedRoom);
    formData.append('file', this.selectedFile, this.selectedFile.name);
    return formData;
  }

  uploadFile() {
    this.studentService
    .addMultipleStudent(this.uploadData())
    .subscribe(x => {
      console.log(x);
    })
  }
}
