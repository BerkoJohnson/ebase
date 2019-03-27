import { Component, OnInit } from '@angular/core';
import { PositionService, Position } from '../../services/position.service';
import { Observable } from 'rxjs';
import { Voter, VotersService } from '../../services/voters.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Votes {
  position: {
    title: string;
    _id: string;
    votedType: string;
  },
  candidate: {
    _id: string;
    name: string;
  },
  voted: string;
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  positions$: Observable<Position[]>;
  votingObject: Votes[] =[];
  voter: Voter;
  voterID: string;
  login: FormGroup;
  message: string;
  chosenPositions: string[] =[];

  constructor(
      private positionService: PositionService,
      private fb: FormBuilder,
      private voterService: VotersService
    ) {
    this.login = this.fb.group({
      pin: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.positions$ = this.positionService.positions$;
    this.voterService.voter$.subscribe(doc => {
      this.voter = doc;
    });
  }

  vote(position, candidate, votedType) {
    const obj = {
      position: {
        title: position.title,
        _id: position._id,
        votedType: votedType
      },
      candidate: {
        _id: candidate._id,
        name: candidate.name
      },
      voted: votedType
    };

    if(this.chosenPositions.indexOf(position.title) === -1) {
      this.chosenPositions.push(position.title);
      this.votingObject.push(obj);
    }


  }

  onFinishVoting() {
    const voter = this.voter['voter'];
    this.voterService.vote(this.votingObject,voter).subscribe(doc => {
      if(doc) {
        this.votingObject = [];
        console.log(doc)
      }
      this.login.reset();
    });
  }

  onSubmit() {
    if(this.l.invalid) {
      return ;
    }
    this.voterService.login(this.pin.value).subscribe(doc => {
      if(doc['message']) {
        this.message = doc['message'];
      }
    });
  }

  get pin() {
    return this.login.get('pin');
  }
  get l() {
    return this.login;
  }
}
