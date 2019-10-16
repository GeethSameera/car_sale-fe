import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toastr.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { InventoryService } from '../services/inventory.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-order-details-report',
  templateUrl: './order-details-report.component.html',
  styleUrls: ['./order-details-report.component.sass']
})
export class OrderDetailsReportComponent implements OnInit {

  public filter;
  public currentDate = new Date();
  public fromDate;
  public toDate;
  public PaymentsList;
  public netTotal: number = 0;

  constructor(public toasterService: ToasterService, private inventoryService: InventoryService) { }

  ngOnInit() {
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
      pdf.save('Order_Summary.pdf'); // Generated PDF
    });
  }


  viewDetails() {
    this.inventoryService.getReportData(this.fromDate, this.toDate, this.filter).subscribe(
      data => {
        this.PaymentsList = data.data.orderList;
        console.log(this.PaymentsList)
      },
      error => {
        this.toasterService.Error("No Data Found");
      }
    )
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
