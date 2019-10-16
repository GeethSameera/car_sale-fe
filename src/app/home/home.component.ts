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
  
  constructor(private router:Router,private inventoryService:InventoryService) { }

  ngOnInit() {
    this.getInventoryData();
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
}
