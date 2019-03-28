import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {PositionService, Position} from '../../../services/position.service';
import {CandidateService, Candidate} from '../../../services/candidate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  newCandidate: FormGroup;
  updateCandidateForm: FormGroup;
  selectedFile: File;
  positions$: Observable<Position[]>;
  candidates$: Observable<Candidate[]>;
  imgUrl= 'assets/download.png';
  lastSavedId: string;

  constructor(private fb: FormBuilder, private positionService: PositionService, private candidateService: CandidateService) { }

  ngOnInit() {
    this.positions$ = this.positionService.positions$;
    this.candidates$ = this.candidateService.candidates$;
    // this.candidates$ = this.candidateService.candidates$;

    this.newCandidate = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\- ]+$/), Validators.minLength(6), Validators.maxLength(50)]],
      position: ['', Validators.required]
    });

    this.updateCandidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\- ]+$/), Validators.minLength(6), Validators.maxLength(50)]],
      position: ['', Validators.required]
    });
  }

  selectedCandidate;


  onUpdateCandidate(candidate: Candidate) {
    this.selectedCandidate = candidate;
    this.updateCandidateForm.patchValue({
      "name": candidate.name,
      "position": candidate.position['_id']
    }, {
      emitEvent: true
    })
  }



  // Show photo show
  onChange(event: Event) {
    this.selectedFile = event.target['files'][0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgUrl = e.target['result'];
    }
    reader.readAsDataURL(event.target['files'][0]);
  }

  uploadData() {
    const formData = new FormData();
    formData.append('id', this.lastSavedId);
    formData.append('image', this.selectedFile, this.selectedFile.name);
    // formData.append('file', this.selectedFile);
    return formData;
  }

  addCandidate() {
    if(this.newCandidate.invalid) {
      return;
    }

    this.candidateService.addCandidate({
      name: this.f.name.value,
      position: this.f.position.value
    }).subscribe(
      doc => {
        if(doc) {
          this.lastSavedId = doc['candidate']['_id'];
        }
      }
    );
  }


  updateCandidate() {
    if(this.updateCandidateForm.invalid) {
      return;
    }

    this.candidateService.updateCandidate({
      name: this.upf.name.value,
      position: this.upf.position.value
    }, this.selectedCandidate._id).subscribe(
      doc => {
        console.log(doc);
      }
    );
  }

  removeCandidate(id: string) {
    if(!id) {
      return;
    }
    this.candidateService.removeCandidate(id).subscribe();
  }

  get f() {
    return this.newCandidate.controls;
  }

  get upf() {
    return this.updateCandidateForm.controls;
  }


  uploadPhoto() {
    if(!this.lastSavedId) {
      return;
    }
    this.candidateService
      .uploadPhoto(this.uploadData())
      .subscribe(x => console.log(x));
  }

  onChangePhoto(candidate) {
    this.lastSavedId = candidate._id;
    this.imgUrl = 'assets/download.png';
  }
}
