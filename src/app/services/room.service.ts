import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

export interface Room {
  title: string;
}
const URL = "/api/v1/rooms";

@Injectable({
  providedIn: "root"
})
export class RoomService {
  private _rooms = new BehaviorSubject<Room[]>(null);
  public rooms$ = this._rooms.asObservable();

  constructor(private http: HttpClient) {
    this.loadRooms();
  }

  loadRooms() {
    this.getRooms().subscribe(docs => this._rooms.next(docs));
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(URL);
  }


  addRoom(room: Room): Observable<{message: string}> {
    return this.http
      .post<{ message: string }>(URL,room)
      .pipe(
        map(x => {
          if(x) {
            this.loadRooms();
          }
          return x;
      })
    );
  }

  removeRoom(id): Observable<{message: string}> {
    return this.http
      .delete<{message: string}>(`${URL}/${id}`)
      .pipe(
        map(x => {
          if(x) {
            this.loadRooms();
          }
          return x;
        })
      )
  }
}
