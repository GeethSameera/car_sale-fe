import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toastr.service';
import { InventoryService } from '../services/inventory.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  userName;
  password;
  enableTopNav = true;
  loggedInUser = "Login";
  signUp = false;
  signIn = true;

  title;
  firstName;
  lastName;
  email;
  phone;
  nic;
  address;
  userPassword;
  role;

  constructor(private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService,
    private inventroyService: InventoryService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
  }

  authenticate() {
    let model = {
      username: this.userName,
      password: this.password
    }
    this.authService.authenticate(model).subscribe(
      data => {
        this.toasterService.Success("Welcome to Automart")
        this.loggedInUser = data.data.fname;
        this.dataService.loginDetails = data.data;
        if (data.data.userid == 1) {
          localStorage.setItem('loggedUser', "admin");
          this.enableTopNav = false;
          this.router.navigate(['admin'])
        }
        else {
          this.router.navigate([''])
        }
        localStorage.setItem('isLoggedIn', "true");

      }
    )
  }

  disableSideNav() {
    if (localStorage.getItem("loggedUser") == "admin") {
      this.enableTopNav = false;
    }
  }

  switchToSignUp() {
    this.signIn = false;
    this.signUp = true;
  }

  switchToLogin() {
    this.signIn = true;
    this.signUp = false;
  }

  register() {
    let user = {
      "nic": this.nic,
      "title": this.title,
      "fname": this.firstName,
      "lname": this.lastName,
      "email": this.email,
      "phone": this.phone,
      "address": this.address,
      "password": this.password,
      "role": "user"
    }
    console.log(user)
    this.inventroyService.registerUser(user).subscribe(
      data => {
        this.toasterService.Success("User Created");
        this.clear();
        this.switchToLogin()
      },
      error => {
        this.toasterService.Error("User Creation Failed");
      }
    )

  }

  clear() {
    this.title = ""
    this.firstName = ""
    this.lastName = ""
    this.email = ""
    this.phone = ""
    this.nic = ""
    this.address = ""
    this.password = ""
    this.role = ""
  }

}
