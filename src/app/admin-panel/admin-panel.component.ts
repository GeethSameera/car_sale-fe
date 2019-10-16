import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router:Router) { }

  addNewVehicles = true;
  addNewSparePart = false;
  viewInventory = false;
  addUsers = false;
  updateUser = false;
  viewReport1 = false;
  viewReport2 = false;
  ngOnInit() {
  }

  setRoute(route:string){
    if(route == "addNewVehicles"){
      this.disableRoutes()
      this.addNewVehicles = true;
    }
    if(route == "addNewSparePart"){
      this.disableRoutes()
      this.addNewSparePart = true;
    }
    if(route == "viewInventory"){
      this.disableRoutes()
      this.viewInventory = true;
    }
    if(route == "addUsers"){
      this.disableRoutes()
      this.addUsers = true;
    }
    if(route == "updateUser"){
      this.disableRoutes()
      this.updateUser = true;
    }
    if(route == "viewReport1"){
      this.disableRoutes()
      this.viewReport1 = true;
    }
    if(route == "viewReport2"){
      this.disableRoutes()
      this.viewReport2 = true;
    }
  }
logout(){
  localStorage.setItem('isLoggedIn', "false");
  localStorage.setItem('loggedUser', "Visitor");
  this.router.navigate(['']);
}
  disableRoutes(){
    this.addNewVehicles = false;
    this.addNewSparePart = false;
    this.viewInventory = false;
    this.addUsers = false;
    this.updateUser = false;
    this.viewReport1 = false;
    this.viewReport2 = false;
  }
}
