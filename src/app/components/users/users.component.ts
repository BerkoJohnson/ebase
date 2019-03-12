import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$;
  selected: 0;

  constructor(private userService: UserService, private auth: AuthService) {

  }

  ngOnInit() {
    // this.userService.getUsers().subscribe(x => this.users = x);
    this.users$ = this.userService.users$;
  }

}
