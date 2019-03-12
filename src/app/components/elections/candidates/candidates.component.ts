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
  CandidatePhotoForm;
  positions$;
  candidates$;
  imageUrl = 'assets/download.png';
  imagePath;

  constructor(private fb: FormBuilder, private positionService: PositionService, private candidateService: CandidateService) { }

  ngOnInit() {
    this.positions$ = this.positionService.positions$;
    this.candidates$ = this.candidateService.candidates$;

    this.newCandidate = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/), Validators.minLength(6), Validators.maxLength(50)]],
      position: ['', Validators.required]
    });


    this.CandidatePhotoForm = this.fb.group({
      filePhoto: ['', Validators.required]
    });
  }


  // Show photo show
  showPhotoPreview(e) {
    if(e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.imageUrl = reader.result;
        console.log('event: ', event);
        console.log('reader.result: ', reader.result);
      }
    }
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
