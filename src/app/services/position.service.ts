import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Announcer } from "./announcer";

export interface Position {
  title: string;
}
const URL = "/api/v1/positions";

@Injectable({
  providedIn: "root"
})
export class PositionService {
  private _positions = new BehaviorSubject<Position[]>(null);
  public positions$ = this._positions.asObservable();

  constructor(private http: HttpClient) {
    this.loadPositions();
  }

  loadPositions() {
    this.getPositions().subscribe(docs => this._positions.next(docs));
  }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(URL);
  }


  addPosition(position: Position): Observable<{message: string}> {
    return this.http
      .post<{ message: string }>(URL,position)
      .pipe(
        map(x => {
          if(x) {
            this.loadPositions();
          }
          return x;
      })
    );
  }

  removePosition(id): Observable<{message: string}> {
    return this.http
      .delete<{message: string}>(`${URL}/${id}`)
      .pipe(
        map(x => {
          if(x) {
            this.loadPositions();
          }
          return x;
        })
      )
  }
}
