import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { InventoryService } from '../services/inventory.service';
import { ToasterService } from '../services/toastr.service';
import { Router } from '@angular/router';

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

  card_type;
  card_no;
  card_csv;
  card_exp;
  card_holder;
  loggedIn: boolean;

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
    let item = {
      "card_type": this.card_type,
      "card_no": this.card_no,
      "card_csv": this.card_csv,
      "card_exp": this.card_exp,
      "card_holder": this.card_holder,
      "buyer_id": this.dataService.loginDetails.userid,
      "item_list": this.itemList,
      "quantity_list": this.quantityList,
      "per_unit_price": this.priceList
    }
    console.log(item)
    this.inventoryService.pay(item).subscribe(
      data => {
        this.toasterService.Success("Payment Successfull")
        this.clearCart();
      },
      error => {
        this.toasterService.Error("Payment Failed")
      }
    )
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
  }

  logout(){
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('loggedUser', "none");
    this.loggedIn = false;
    this.router.navigate(['']);
  }

}
