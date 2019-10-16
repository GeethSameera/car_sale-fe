import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'auth-app';

  user;
  enableTopNav = true;
  loginform: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    // this.loginform = this.formBuilder.group({
    //   username: ["hiranthaathapaththu@gmail.com", Validators.required],
    //   password: ["123456", Validators.required]
    // })
    // this.disableSideNav();
  }

  // disableSideNav() {
  //   // console.log("called")
  //   if (localStorage.getItem("loggedUser") == "admin") {
  //     this.enableTopNav = false;
  //   }
  //   else{
  //     this.enableTopNav = true;
  //   }
  // }
  


}
