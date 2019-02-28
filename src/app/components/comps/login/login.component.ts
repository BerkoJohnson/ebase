import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Announcer} from '../../../services/announcer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  loggingIn = false;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private  authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private announcer: Announcer) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z0-9]*[!@&?]+$/)]]
      /*
       password include
         1. Alpha-numeric charjjjjlj?acters
         2. Should contain at least 6 characters and at most 30 characters long
         3. Should contain at least one(1) of these characters: "!@&?"
      */

    });
  }

  ngOnInit() {}

  submit() {
    this.submitted = true;

    if (!this.fm.valid) {
      return;
    }
    this.loggingIn = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(() => {
        this.announcer.send({type: 'success', text: 'You are logged in.'});
        this.loggingIn = false;
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl || '/');
      }, err => {
          this.announcer.send({type: 'danger', text: err});
        this.loggingIn = false;
      });
  }

  // Form input Getters
  get f() {
    return this.loginForm.controls;
  }
  get fm() {
    return this.loginForm;
  }


}
