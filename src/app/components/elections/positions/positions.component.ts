import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PositionService} from '../../../services/position.service';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  newPositionForm;
  positions$;

  constructor(private fb: FormBuilder, private positionService: PositionService) { }

  ngOnInit() {
    this.newPositionForm = this.fb.group({
      title: ['', [Validators.required]]
    });

    this.positions$ = this.positionService.positions$;
  }

  addPosition() {
    if(this.newPositionForm.invalid) {
      return;
    }
    this.positionService
      .addPosition({title: this.f.title.value})
      .subscribe(x => {
        this.newPositionForm.get('title').value = '';
    });
  }


  get f() {
    return this.newPositionForm.controls;
  }

  removePosition(id) {
    this.positionService.removePosition(id).subscribe();
  }
}
