import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

export interface Student {
  name: string;
  room: string;
}
export interface StudentPayload {
  _id: string;
  name: string;
  yearOfAdmission: number;
}
const URL = "/api/v1/students";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  private _students = new BehaviorSubject<StudentPayload[]>(null);
  public students$ = this._students.asObservable();

  constructor(private http: HttpClient) {
    this.loadStudents();
  }

  loadStudents() {
    this.getStudents().subscribe(docs => this._students.next(docs));
  }

  getStudents(): Observable<StudentPayload[]> {
    return this.http.get<StudentPayload[]>(URL);
  }


  addStudent(body: any): Observable<StudentPayload> {
    return this.http
      .post<StudentPayload>(URL, body);
  }

  addMultipleStudent(body: FormData): Observable<StudentPayload[]> {
    return this.http
      .post<StudentPayload[]>(`${URL}/multiple`, body);
  }

  removeStudent(id: string): Observable<StudentPayload> {
    return this.http
      .delete<StudentPayload>(`${URL}/${id}`)
      .pipe(
        map(x => {
          if(x) {
            this.loadStudents();
          }
          return x;
        })
      )
  }
}
