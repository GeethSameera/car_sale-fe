import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { DataService } from '../services/data.service';
import { ToasterService } from '../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vehicles',
  templateUrl: './view-vehicles.component.html',
  styleUrls: ['./view-vehicles.component.sass']
})
export class ViewVehiclesComponent implements OnInit {

  carList:any[];
  cart: any[] = [];
  loggedIn: boolean;
  loggedInUser: string;

  constructor(private inventoryService:InventoryService,
    private dataService:DataService,
    private toasterService:ToasterService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getInventoryData();
    this.isLoggedIn();
  }

  getInventoryData(){
    this.inventoryService.getItemList().subscribe(
      data =>{
        console.log(data)
        this.carList = data.data.cars;
      }
    )
  }

  addToCart(item:any){
    if(this.isLoggedIn()){
      item.expon = 1
    this.dataService.shoppingCart.push(item)
    this.toasterService.Info("Item Added to Cart")
    console.log(this.dataService.shoppingCart)
    }
    else{
      this.toasterService.Error("Please Log in to Automart First")
    }
  }

  isLoggedIn(){
    if (localStorage.getItem("isLoggedIn") == "false") {
      this.loggedIn = false;
      return false;
    }
    else{
      this.loggedIn = true;
      this.loggedInUser = localStorage.getItem("loggedUser")
      return true;
    }
  }

  logout(){
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('loggedUser', "Visitor");
    this.loggedInUser = "Visitor"
    this.loggedIn = false;
    this.router.navigate(['']);
  }
}
