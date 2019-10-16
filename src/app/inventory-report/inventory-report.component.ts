import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ToasterService } from '../services/toastr.service';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.sass']
})
export class InventoryReportComponent implements OnInit {

  public filter = "cars";
  public currentDate = new Date();
  public fromDate;
  public toDate;
  public inventoryListCars;
  public inventoryListParts;
  public netTotal: number = 0;
  public car_table = true;
  public parts_table = false;

  constructor(public toasterService: ToasterService,
    private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getData();
  }

  public captureScreen() {
    document.getElementById('report_content').style.width = "11.7in";
    var data = document.getElementById('report_content');
    html2canvas(data).then(canvas => {
      document.getElementById('report_content').style.width = "auto";
      const contentDataURL = canvas.toDataURL('text/html')
      let pdf = new jspdf('l', 'in', 'A4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position)
      pdf.save('Inventory_Details.pdf'); // Generated PDF
    });
  }

  getData() {
    this.inventoryService.getItemList().subscribe(
      data => {
        this.inventoryListCars = data.data.cars;
        this.inventoryListParts = data.data.parts;
      },
      error => {
        this.toasterService.Error("No Data Found");
      }
    )
  }

  viewDetails(){
    if(this.filter == "cars"){
      this.parts_table = false;
      this.car_table = true;
      // this.inventoryList = this.inventoryList.cars;
    }
    else if(this.filter == "parts"){
      this.car_table = false;
      this.parts_table = true;
    }
  }

  calculateOrderTotal(order: any) {
    let total = 0;
    if (order) {
      if (order.items.cars.length > 0) {
        order.items.cars.forEach(element => {
          total = total + (element.bought_price * element.bought_quantity);
        });
      }
      if (order.items.parts.length > 0) {
        order.items.parts.forEach(element => {
          total = total + (element.bought_price * element.bought_quantity);
        });
      }
    }
    this.netTotal = this.netTotal + total;
    console.log(this.netTotal)
    return total;
  }
}
