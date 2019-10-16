import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  carList = [];
  loggedInUser = "Login"
  loggedIn:boolean ;
  constructor(private router:Router,private inventoryService:InventoryService) { }

  ngOnInit() {
    this.getInventoryData();
    this.isLoggedIn();
  }

  searchVehicle(){
    this.router.navigate(['vehicles'])
  }

  getInventoryData(){
    this.inventoryService.getItemList().subscribe(
      data =>{
        console.log(data)
        this.carList = data.data.cars;
      }
    )
  }
  isLoggedIn() {
    if (localStorage.getItem("isLoggedIn") == "true") {
      this.loggedIn = true;
    }
  }

  logout(){
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('loggedUser', "none");
    this.loggedIn = false;
    this.router.navigate(['']);
  }

}
