import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Announcer, Message} from '../../services/announcer';

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users;
  message$;

  constructor(private announcer: Announcer) {
  }

  ngOnInit() {
    this.message$ = this.announcer.message$;
  }

}
