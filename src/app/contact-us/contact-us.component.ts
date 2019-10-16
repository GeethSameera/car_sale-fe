import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.sass']
})
export class ContactUsComponent implements OnInit {
  loggedIn: boolean;
  loggedInUser: string;

  constructor(private router:Router) { }

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (localStorage.getItem("isLoggedIn") == "true") {
      this.loggedIn = true;
    }
    this.loggedInUser = localStorage.getItem("loggedUser")
  }

  logout(){
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('loggedUser', "Visitor");
    this.loggedInUser = "Visitor"
    this.loggedIn = false;
    this.router.navigate(['']);
  }

}
