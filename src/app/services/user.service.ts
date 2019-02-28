import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {Announcer} from './announcer';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users = new BehaviorSubject<User[]>(null);
  public users$ = this._users.asObservable();

  constructor(private http: HttpClient, private announcer: Announcer) {
    this.loadUser();
  }

  loadUser() {
    this.getUsers().subscribe(docs => this._users.next(docs));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/v1/users');
  }

  createUser(user: User): Observable<{message: string}> {
    return this.http.post<{message: string}>('/api/v1/users', user).pipe(
      map(u => {
        if (u) {
          if (u.message !== 'User saved') {
            this.announcer.send({type: 'danger', text: 'New user could not be saved.'});
          } else {
            this.announcer.send({type: 'success', text: 'New user successfully saved.'});
          }
          this.loadUser();
          return u;
        }
      })
    );
  }
}
