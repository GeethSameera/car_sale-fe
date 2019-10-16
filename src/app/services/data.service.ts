import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  shoppingCart: Array<any> = new Array<any>();
  loginDetails:any;
  selectedCar:any;
  selectedPart:any;

  constructor() { }
}
