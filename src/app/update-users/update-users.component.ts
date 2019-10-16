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

  public searchParameter = "";
  public title;
  public fname;
  public lname;
  public nic;
  public phone;
  public address;
  public
  public isValid = false;

  constructor(private invetoryService: InventoryService, private toasterService: ToasterService) { }

  ngOnInit() {

  }

  searchUser() {
    this.invetoryService.getUserData(this.searchParameter).subscribe(
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

  updateUser() {
    let user = {
      userid: this.searchParameter,
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
