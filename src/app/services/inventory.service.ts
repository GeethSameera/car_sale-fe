import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class InventoryService {
  path: string = "";
  constructor(private _http: HttpClient) {
    this.path = environment.apiBase;
  }

  getPath(): string {
    return this.path;
  }
  getItemList(): Observable<any> {
    return this._http.get<any>(`${this.getPath()}inventory/get?filter=all`);
  }
  registerUser(body: any): Observable<any> {
    return this._http.post<any>(`${this.getPath()}user/register`, body);
  }
  pay(body: any): Observable<any> {
    return this._http.post<any>(`${this.getPath()}payment/payorder`, body);
  }
  saveVehicles(body: any): Observable<any> {
    return this._http.post<any>(`${this.getPath()}/inventory/new`, body);
  }
  updateUser(body: any): Observable<any> {
    return this._http.post<any>(`${this.getPath()}/user/update`, body);
  }
  updateVehicle(body: any): Observable<any> {
    return this._http.post<any>(`${this.getPath()}/inventory/updateitem`, body);
  }
  getUserData(userID:any): Observable<any> {
    return this._http.get<any>(`${this.getPath()}/user/get?userid=${userID}`);
  }
  deleteInventoryData(invID:any): Observable<any> {
    return this._http.get<any>(`${this.getPath()}/inventory/delete?invid=${invID}`);
  }
  getReportData(fromDate:any,toDate:any,filter:any): Observable<any> {
    return this._http.get<any>(`${this.getPath()}/order/get?filter=${filter}&from=${fromDate}&to=${toDate}`);
  }
}
