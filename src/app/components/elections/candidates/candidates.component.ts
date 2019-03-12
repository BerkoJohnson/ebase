import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PositionService} from '../../../services/position.service';
import {CandidateService} from '../../../services/candidate.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  newCandidate;
  positions$;
  candidates$;

  constructor(private fb: FormBuilder, private positionService: PositionService, private candidateService: CandidateService) { }

  ngOnInit() {
    this.positions$ = this.positionService.positions$;
    this.candidates$ = this.candidateService.candidates$;

    this.newCandidate = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/), Validators.minLength(6), Validators.maxLength(50)]],
      position: ['', Validators.required]
    });
  }


  addCandidate() {
    if(this.newCandidate.invalid) {
      return;
    }

    this.candidateService.addCandidate({
      name: this.f.name.value,
      position: this.f.position.value
    }).subscribe();
  }


  removeCandidate(id) {
    if(!id) {
      return;
    }
    this.candidateService.removeCandidate(id).subscribe();
  }
  get f() {
    return this.newCandidate.controls;
  }
}
