import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Announcer } from './announcer';
import { PositionService } from './position.service';

export interface Candidate {
  name: string;
  position: string;
}
// interface Payload {
//   message: string;
//   candidate: any;
// }
const URL = '/api/v1/candidates';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private _candidates = new BehaviorSubject<Candidate[]>(null);
  public candidates$ = this._candidates.asObservable();

  constructor(
    private http: HttpClient,
    private positionService: PositionService
  ) {
    this.loadCandidates();
  }

  loadCandidates() {
    this.getCandidates().subscribe(docs => this._candidates.next(docs));
  }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(URL);
  }

  addCandidate(candidate: Candidate) {
    return this.http.post(URL, candidate).pipe(
      map(x => {
        if (x) {
          this.loadCandidates();
          this.positionService.loadPositions();
        }
        return x;
      })
    );
  }

  removeCandidate(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${URL}/${id}`).pipe(
      map(x => {
        if (x) {
          this.loadCandidates();
          this.positionService.loadPositions();
        }
        return x;
      })
    );
  }

  uploadPhoto(body) {
    return this.http.put(`${URL}/upload-photo`, body, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
