import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface RoomPayload {
  _id: string;
  room: string;
}

export interface Voter {
  student: {
    _id?: string;
    name: string;
  },
  _id: string;
  pin: string;
  room: {
    _id?: string;
    title: string;
  }
}

const URL  = '/api/v1/voters';

@Injectable({
  providedIn: 'root'
})
export class VotersService {
  private _rooms = new BehaviorSubject<RoomPayload[]>(null);
  public readonly rooms$ = this._rooms.asObservable();

  private _voter = new BehaviorSubject<Voter>(null);
  public readonly voter$ = this._voter.asObservable();



  constructor(private http: HttpClient, private auth: AuthService) {
    this.loadRooms();
  }

  loadRooms() {
    this.getRooms().subscribe(docs => {
      this._rooms.next(docs);
    })
  }

  getRooms():Observable<RoomPayload[]> {
    return this.http.get<RoomPayload[]>(`${URL}/imported-classes`);
  }

  getClassVoters(room: string): Observable<Voter[]> {
    return this.http.get<Voter[]>(`${URL}/${room}`)
  }

  getVoters() {
    return this.http.get(URL);
  }

  generateVotersForRoom(room: string): Observable<Voter[]>{
    return this.http.patch<Voter[]>(`${URL}/generate-voters`, {room}).pipe(
      map(docs => {
        if(docs) this.loadRooms();
        return docs;
      })
    );
  }

  login(pin: string): Observable<Voter> {
    return this.http.post<Voter>(`${URL}/login`, {pin}).pipe(
      map(doc => {
        if(doc['voter']) {
          this._voter.next(doc['voter']);
        }
        return doc;
      })
    );
  }

  vote(body, voter) {
    return this.http.put(`${URL}/${voter['_id']}/vote`, body)
    .pipe(
      map(doc => {
        if(doc) {
          this._voter.next(null);
        }
        return doc;
      })
    );
  }

  generate() {
      return this.http.patch<Voter[]>(`${URL}/generate-pins`, {pins: true});
  }
}
