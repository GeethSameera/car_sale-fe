import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  path: string = "";
  constructor(private _http: HttpClient) {
    this.path = environment.apiBase;
  }

  getPath(): string {
    return this.path;
  }

  authenticate(body: any): Observable<any> {
    return this._http.post<any>(`${this.getPath()}auth/authenticate`,body);
  }

  registerDonator(body: any): Observable<any> {
    return this._http.post<any>(`${this.getPath()}donator/register`, body);
  }

  updateDonator(body: any): Observable<any> {
    return this._http.put<any>(`${this.getPath()}donator/update`, body);
  }
  
  getIDList(): Observable<any> {
    return this._http.get<any>(`${this.getPath()}donator/getNICList/`);
  }

  getDonatorList(): Observable<any> {
    return this._http.get<any>(`${this.getPath()}donator/getdonatorlist/`);
  }
}
