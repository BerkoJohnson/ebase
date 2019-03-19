import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-school',
  templateUrl: './new-school.component.html',
  styleUrls: ['./new-school.component.css']
})
export class NewSchoolComponent implements OnInit {
  newSchoolForm= this.fb.group({
    name: null,
    yearEst: null,
    crest: null
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
