import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VotersService {
  constructor(private http: HttpClient, private auth: AuthService) {}


  getVoters() {
    return this.http.get('/api/v1/voters');
  }

  addVoter() {

  }

  addVoters(body) {
    return this.http.post('/api/v1/voters', body);
  }
}
