import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {
  newUserForm;
  saving = false;
  saved = false;

  constructor(private fb: FormBuilder, private  userService: UserService, ) {
    this.newUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,30}[!@&?]+$/)]]
      /*
       password include
         1. Alpha-numeric characters
         2. Should contain at least 6 characters and at most 30 characters long
         3. Should contain at least one(1) of these characters: "!@&?"
      */

    });
  }

  ngOnInit() {
  }

  submit() {
    if (!this.f.valid) {
      return;
    }
    this.saving = true;
    this.userService.createUser({
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      password: this.f.password.value
    })
      .subscribe(x => {
        if (x.message === 'User saved') {
          this.saved = true;
          this.saving = false;
        }
      }, err => {
        this.saving = false;
      });
  }

  // Form input Getters
  get f() {
    return this.newUserForm.controls;
  }
}
