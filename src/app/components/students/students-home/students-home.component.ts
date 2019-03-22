import { Component, OnInit } from '@angular/core';
import { StudentService, StudentPayload } from '../../../services/student.service';
import { Observable } from 'rxjs';
import { Room, RoomService } from '../../../services/room.service';

interface SearchField {
  title: string;
  value: string
}

@Component({
  selector: 'app-students-home',
  templateUrl: './students-home.component.html',
  styleUrls: ['./students-home.component.css']
})
export class StudentsHomeComponent implements OnInit {
  students$: Observable<StudentPayload[]>;
  rooms$: Observable<Room[]>;
  selectedRoom: string;
  selectedSearchFields: SearchField[];


  constructor(private studentService: StudentService, private roomService: RoomService) { }

  ngOnInit() {
    this.students$ = this.studentService.students$;
    this.rooms$ = this.roomService.rooms$;
  }

  get fields(): Array<{name: string, title: string}> {
    return [
      {name: 'name', title: 'Name'}
    ];
  }

  onSelectRoom(event: Event) {
    this.selectedRoom = event.target['value'];
    if(this.selectedSearchFields.indexOf({title: 'room', value: this.selectedRoom}) !== -1) {
      return;
    }
    this.selectedSearchFields.push({title: 'room', value: this.selectedRoom});
  }

  onSelectSearchField(event: Event) {
    console.log(event.target['value']);
    
  }
}
