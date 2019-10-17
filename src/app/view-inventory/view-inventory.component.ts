import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { DataService } from '../services/data.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.sass']
})
export class ViewInventoryComponent implements OnInit {

  carsList : any [];
  invID;
  sparePArtsList : any[];
  detailed_view = false;
  regular_view = true;
  detailed_view_spare = false;
  constructor(
    private inventoryService : InventoryService,
    private dataService:DataService,
    private toasterService:ToasterService
  ) { }

  ngOnInit() {
    this.getInventoryData()
  }

  getInventoryData(){
    this.inventoryService.getItemList().subscribe(
      data =>{
        console.log(data)
        this.carsList = data.data.cars;
        this.sparePArtsList = data.data.parts;
      }
    )
  }

  setRoute(route:string){
    if(route == "detailed_view"){
      this.disableRoutes()
      this.detailed_view = true;
    }
    if(route == "detailed_view_spare"){
      this.disableRoutes()
      this.detailed_view_spare = true;
    }
  }

  disableRoutes(){
    this.regular_view = false;
    this.detailed_view_spare = false;
  }

  selectCar(item:any){
    this.dataService.selectedCar = item;
    this.setRoute("detailed_view");
  }

  selectPart(item:any){
    this.dataService.selectedPart = item;
    this.setRoute("detailed_view_spare");
  }

  deleteItem(){
    this.inventoryService.deleteInventoryData(this.invID).subscribe(
      data =>{
        this.toasterService.Success("Item Deleted");
        this.getInventoryData();
      },
      error =>{
        this.toasterService.Error("Item Deletion Failed")
      }
    )
  }

  setInvID(item){
    this.invID = item.invid;
  }
}
