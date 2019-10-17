import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { InventoryService } from '../services/inventory.service';
import { ToasterService } from '../services/toastr.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total = 0;
  itemList = [];
  quantityList = [];
  priceList = [];
  paymentForm:FormGroup;

  card_type;
  card_no;
  card_csv;
  card_exp;
  card_holder;
  loggedIn: boolean;
  isValid: boolean;
  loggedInUser: string;

  constructor(
    private dataService: DataService,
    private inventoryService: InventoryService,
    private toasterService: ToasterService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getCartItems();
    this.processItemList();
    this.setPaymentArrays();

    this.paymentForm = new FormGroup({
      card_holder: new FormControl('',Validators.required),
      card_type: new FormControl('',Validators.required),
      card_no: new FormControl('',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]),
      card_csv: new FormControl('',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]),
      card_exp: new FormControl('',Validators.required)
    })
  }

  getCartItems() {
    this.cartItems = this.dataService.shoppingCart;
    this.calculateTotal();
    this.isLoggedIn();
  }

  calculateTotal() {
    this.total = 0;
    this.cartItems.forEach(data => {
      if (data.itemtype == "car") {
        this.total = this.total + data.downpayment;
      }
      else if(data.itemtype == "part") {
        this.total = this.total + data.price;
      }
    })
    console.log(this.total)
  }

  processItemList() {
    this.cartItems.forEach(data => {
      if (data.itemtype == "car") {
        data.description = data.brand + "|" + data.model;
      }
      else {
        data.description = data.brand + "|" + data.partname;
      }
    })
  }

  setPaymentArrays() {
    this.cartItems.forEach(data => {
      this.itemList.push(data.invid);
      this.quantityList.push(data.expon);
      if (data.itemtype == "car") {
        this.priceList.push(data.downpayment);
      }
      else {
        this.priceList.push(data.price);
      }
    })
  }

  removeItemFromCart(item) {
    console.log(this.dataService.shoppingCart)
    this.dataService.shoppingCart = this.dataService.shoppingCart.filter(data => data.invid != item.invid)
    console.log(this.dataService.shoppingCart)
    this.getCartItems();
  }

  payOrder() {
    this.validateForm();
    let item = {
      "card_type": this.paymentForm.get('card_type').value,
      "card_no":this.paymentForm.get('card_no').value,
      "card_csv": this.paymentForm.get('card_csv').value,
      "card_exp": this.paymentForm.get('card_exp').value,
      "card_holder": this.paymentForm.get('card_holder').value,
      "buyer_id":  this.dataService.loginDetails.userid,
      "item_list": this.itemList,
      "quantity_list": this.quantityList,
      "per_unit_price": this.priceList
    }
    // console.log(item)
    if(this.paymentForm.status == "VALID"){
      this.inventoryService.pay(item).subscribe(
        data => {
          this.toasterService.Success("Payment Successfull.Receipt Will be Sent to Your Email Shortly")
          this.clearCart();
        },
        error => {
          this.toasterService.Error("Payment Failed")
        }
      )
    }
    else{
      this.toasterService.Error("Some Required Fields are Empty")
    }
  }

  clearCart() {
    this.dataService.shoppingCart = [];
    this.total = 0;
    this.clearPaymentInfo()
    this.getCartItems();
  }

  clearPaymentInfo() {
    this.card_type="";
    this.card_no="";
    this.card_csv="";
    this.card_exp="";
    this.card_holder="";
    this.itemList = [];
    this.quantityList = [];
    this.priceList = [];
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
    this.loggedIn = false;
    this.loggedInUser = "Visitor"
    this.router.navigate(['']);
  }

  validateForm() {
    this.isValid = true;
  }
}
