import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _http: HttpClient) { }

  authorize():Observable<any> {
    return this._http.get<any>(`http://localhost:3000/auth`);
  }

  listFiles(code:any):Observable<any>{
    return this._http.get<any>(`http://localhost:3000/getlist?code=${code}`);
  }
}
