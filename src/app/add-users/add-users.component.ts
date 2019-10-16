import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.sass']
})
export class AddUsersComponent implements OnInit {

  title;
  fname;
  lname;
  email;
  phone;
  nic;
  address;
  password;
  confPassword;
  role;

  constructor( private inventroyService: InventoryService,private toasterService:ToasterService) { }

  ngOnInit() {
  }

  resgisterUser(){

  }

  validatePassword(){
    console.log(this.password,"    ",this.confPassword )
    if(this.password == this.confPassword){
      return true;
    }
    else{
      return false;
    }
  }

  register() {
    let user = {
      "nic": this.nic,
      "title": this.title,
      "fname": this.fname,
      "lname": this.lname,
      "email": this.email,
      "phone": this.phone,
      "address": this.address,
      "password": this.password,
      "role": this.role
    }

    if(this.validatePassword()){
      console.log(user)
      this.inventroyService.registerUser(user).subscribe(
        data => {
          this.toasterService.Success("User Created");
          this.clear();
        },
        error => {
          this.toasterService.Error("User Creation Failed");
        }
      )
    }
    else{
      this.toasterService.Error("Passwords Doesnt Match");
    }

  }

  clear() {
    this.title = "";
    this.fname = "";
    this.lname = "";
    this.email = "";
    this.phone = "";
    this.nic = "";
    this.address = "";
    this.password = ""
    this.confPassword = "";
    this.role = "";
  }
}
