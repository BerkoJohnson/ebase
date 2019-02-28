import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users$;
  selected: 0;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    // this.userService.getUsers().subscribe(x => this.users = x);
    this.users$ = this.userService.users$;
  }

}
