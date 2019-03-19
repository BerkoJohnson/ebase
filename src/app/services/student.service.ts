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
  private _students = new BehaviorSubject<Student[]>(null);
  public students$ = this._students.asObservable();

  constructor(private http: HttpClient) {
    this.loadStudents();
  }

  loadStudents() {
    this.getStudents().subscribe(docs => this._students.next(docs));
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(URL);
  }


  addStudent(body): Observable<StudentPayload> {
    return this.http
      .post<StudentPayload>(URL, body);
  }

  addMultipleStudent(body): Observable<StudentPayload[]> {
    return this.http
      .post<StudentPayload[]>(`${URL}/multiple`, body);
  }

  removeStudent(id): Observable<StudentPayload> {
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
