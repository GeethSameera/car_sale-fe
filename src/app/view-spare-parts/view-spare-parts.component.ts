import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { DataService } from '../services/data.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-view-spare-parts',
  templateUrl: './view-spare-parts.component.html',
  styleUrls: ['./view-spare-parts.component.sass']
})
export class ViewSparePartsComponent implements OnInit {

  sparePartsList: any[];

  constructor(private inventoryService: InventoryService,
    private toasterService: ToasterService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getInventoryData()
  }

  getInventoryData() {
    this.inventoryService.getItemList().subscribe(
      data => {
        console.log(data)
        this.sparePartsList = data.data.parts;
      }
    )
  }
  addToCart(item: any) {
    if (this.isLoggedIn()) {
      item.expon = 1
      this.dataService.shoppingCart.push(item)
      this.toasterService.Info("Item Added to Cart")
      console.log(this.dataService.shoppingCart)
    }
    else {
      this.toasterService.Error("Please Log in to Automart First")
    }
  }

  isLoggedIn() {
    if (localStorage.getItem("isLoggedIn") == "false") {
      return false;
    }
    else {
      return true;
    }
  }
}
