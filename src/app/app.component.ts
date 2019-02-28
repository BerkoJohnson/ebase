import {Component, OnInit} from '@angular/core';
import {Announcer} from './services/announcer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ebase';
  message$;
  constructor(private announcer: Announcer) {
  }

  ngOnInit() {
    this.message$ = this.announcer.message$;
  }
}
