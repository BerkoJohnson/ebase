import { Component, OnInit } from '@angular/core';
import { StudentService, StudentPayload } from '../../../services/student.service';
import { Observable } from 'rxjs';
import { Room, RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-students-home',
  templateUrl: './students-home.component.html',
  styleUrls: ['./students-home.component.css']
})
export class StudentsHomeComponent implements OnInit {
students$: Observable<StudentPayload[]>;
rooms$: Observable<Room[]>;
  constructor(private studentService: StudentService, private roomService: RoomService) { }

  ngOnInit() {
    this.students$ = this.studentService.students$;
    this.rooms$ = this.roomService.rooms$;
  }

  onSelectRoom(event: Event) {
    console.log(event.target['value']);
  }
  onSelectSearchField(event: Event) {
    console.log(event.target['value']);
  }
}
