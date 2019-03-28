import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VotersService, RoomPayload, Voter } from '../../../services/voters.service';
import { RoomService, Room } from '../../../services/room.service';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css']
})
export class VotersComponent implements OnInit {
  rooms$: Observable<RoomPayload[]>;
  selectedRoom: string;
  voters: Voter[];
  generating= 'pending!';
  roomSelectedForGenerateVoters: string;

  allRooms$: Observable<Room[]>;
  constructor(private voterService: VotersService, private roomService: RoomService) { }

  ngOnInit() {
    this.rooms$ = this.voterService.rooms$;
    this.allRooms$ = this.roomService.rooms$;
  }

  onSelectRoom(room: string) {
    this.selectedRoom = room;


  }


  onSelectedForGenerate(event: Event) {
    this.generating = 'pending!';
    this.roomSelectedForGenerateVoters = event.target['value'];
  }

  onGenerateVoters() {
    if(!this.roomSelectedForGenerateVoters) {
      return;
    }
    this.generating = 'loading!';
    this.voterService
      .generateVotersForRoom(this.roomSelectedForGenerateVoters)
      .subscribe(docs => {
        if(docs) {
          this.voters = docs;
          this.generating = 'finished!'
        }
      });
  }

  generatePins() {
    this.voterService.generate().subscribe(o => console.log(o));
  }
}
