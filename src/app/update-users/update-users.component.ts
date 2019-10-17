import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.sass']
})
export class UpdateUsersComponent implements OnInit {

  public searchParameter;
  public selectedUserID;
  public title;
  public fname;
  public lname;
  public nic;
  public phone;
  public address;
  public searchView = true;
  public updateView = false;
  public isValid = false;
  public userList = [];
  public userListOrig= [] ;



  constructor(private invetoryService: InventoryService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getAllUser();
  }

  filterUser(){
    console.log(this.searchParameter)
    this.userList = this.userListOrig.filter(data =>data.fname == this.searchParameter);
    console.log(this.userList)
  }

  searchUser(id:any) {
    this.searchView = false;
    this.updateView = true;
    this.selectedUserID = id;
    this.invetoryService.getUserData(id).subscribe(
      data => {
        this.title = data.data.title;
        this.fname = data.data.fname;
        this.lname = data.data.lname;
        this.nic = data.data.nic;
        this.phone = data.data.phone;
        this.address = data.data.address;
        this.toasterService.Success("User Data Retrieved");
      },
      error => {
        this.toasterService.Error("User Not Found")
      }
    )
  }

  getAllUser(){
    this.invetoryService.getUsers().subscribe(
      data =>{
        this.userListOrig = data.data;
        this.userList = data.data;
      }
    )
  }
  updateUser() {
    let user = {
      userid: this.selectedUserID,
      nic: this.nic,
      title: this.title,
      fname: this.fname,
      lname: this.lname,
      phone: this.phone,
      address: this.address,
    }
    this.invetoryService.updateUser(user).subscribe(
      data => {
        this.toasterService.Success("User Updated");
        this.clearForm();
      },
      error => {
        this.toasterService.Error("User Update Failed")
      }
    )
  }

  removeUser(){
    this.invetoryService.deleteUser(this.selectedUserID).subscribe(
      data =>{
        this.toasterService.Success("User Removed");
        this.clearForm();
      },
      error=>{
        this.toasterService.Error("User Removal Failed")
      }
    )
  }

  clearForm() {
    this.searchParameter = "";
    this.title = "";
    this.fname = "";
    this.lname = "";
    this.nic = "";
    this.phone = "";
    this.address = "";
  }
}
