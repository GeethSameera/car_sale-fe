import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toastr.service';
import { InventoryService } from '../services/inventory.service';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerForm: FormGroup;
  public loginForm: FormGroup;
  userName;
  password;
  enableTopNav = true;
  loggedInUser = "";
  signUp = false;
  signIn = true;

  title;
  firstName;
  lastName;
  email;
  phone;
  nic;
  address;
  confpassword;
  role;
  loggedIn: boolean;
  isValid: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService,
    private inventroyService: InventoryService,
    private dataService: DataService,
  ) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      title: new FormControl('',Validators.required),
      fname: new FormControl('',Validators.required),
      lname:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      phone:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      nic:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      address:new FormControl('',Validators.required),
      password:new FormControl('',[Validators.required,Validators.minLength(8)]),
      confpassword:new FormControl('',[Validators.required,Validators.minLength(8)]),
      role:new FormControl('user',Validators.required),
    });

    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })

    this.isLoggedIn();
  }

  authenticate() {
    this.validateForm();
    let model = {
      username: this.userName,
      password: this.password
    }
    if(this.loginForm.status == 'VALID'){
      this.authService.authenticate(this.loginForm.value).subscribe(
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
            localStorage.setItem('loggedUser', this.loggedInUser);
            this.router.navigate([''])
          }
          localStorage.setItem('isLoggedIn', "true");
  
        }
      )
    }
    else{
      this.toasterService.Error("Some Required Fields Empty");
    }
    
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
    this.validateForm();
    if(this.registerForm.status == 'VALID'){
      if(this.checkPassword()){
        let user = {
          "nic": this.registerForm.get('nic').value,
          "title": this.registerForm.get('title').value,
          "fname": this.registerForm.get('fname').value,
          "lname": this.registerForm.get('lname').value,
          "email": this.registerForm.get('email').value,
          "phone": this.registerForm.get('phone').value,
          "address": this.registerForm.get('address').value,
          "password": this.registerForm.get('password').value,
          "role": "user"
        }
        console.log(user)
        this.inventroyService.registerUser(user).subscribe(
          data => {
            this.toasterService.Success("User Created");
            this.clear();
            this.switchToLogin();
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
    else{
      this.toasterService.Error("Some Required Fields Empty");
    }

  }

  checkPassword(){
    if(this.registerForm.get('password').value == this.registerForm.get('confpassword').value){
      return true
    }
    else{
      return false;
    }
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

    this.registerForm.reset();
  }

  isLoggedIn() {
    if (localStorage.getItem("isLoggedIn") == "true") {
      this.loggedIn = true;
      this.loggedInUser = localStorage.getItem("loggedUser")
    }
  }

  logout(){
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('loggedUser', "Visitor");
    this.loggedInUser = "Visitor"
    this.loggedIn = false;
    this.router.navigate(['']);
  }

  validateForm() {
    this.isValid = true;
  }
}
