import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { InventoryService } from '../services/inventory.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-spare-detailed-view',
  templateUrl: './spare-detailed-view.component.html',
  styleUrls: ['./spare-detailed-view.component.sass']
})
export class SpareDetailedViewComponent implements OnInit {

  public formValid : FormGroup;
  public isValid = false;
  model : FormData;
  selectedPart;
  
  constructor(
    private dataService:DataService,
    private inventoryService : InventoryService,
    private toasterService:ToasterService
    ) { }

  ngOnInit() {
    this.formValid = new FormGroup({
      invid: new FormControl('',Validators.required),
      partname: new FormControl('',Validators.required),
      itemtype: new FormControl('',Validators.required),
      stock:new FormControl('',Validators.required),
      plateno:new FormControl('',Validators.required),
      brand:new FormControl('',Validators.required),
      model:new FormControl('',Validators.required),
      prodyr:new FormControl('',Validators.required),
      color:new FormControl('',Validators.required),
      mileage:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      downpayment:new FormControl('',Validators.required),
      imageFile:new FormControl('',Validators.required)
    });
    this.getData()
  }

  getData(){
    this.selectedPart = this.dataService.selectedPart;
    console.log(this.selectedPart)
    this.formValid.patchValue(this.selectedPart);
    this.formValid.get("invid").setValue(this.selectedPart.invid);
    this.formValid.get("itemtype").setValue(this.selectedPart.itemtype);
  }

  updatePart(){
    const formData = new FormData();
    formData.append('invid', this.formValid.get('invid').value);
    formData.append('partname', this.formValid.get('partname').value);
    formData.append('itemtype', this.formValid.get('itemtype').value);
    formData.append('stock', this.formValid.get('stock').value);
    formData.append('plateno', this.formValid.get('plateno').value);
    formData.append('brand', this.formValid.get('brand').value);
    formData.append('model', this.formValid.get('model').value);
    formData.append('prodyr', this.formValid.get('prodyr').value);
    formData.append('color', this.formValid.get('color').value);
    formData.append('mileage', this.formValid.get('mileage').value);
    formData.append('description', this.formValid.get('description').value);
    formData.append('price', this.formValid.get('price').value);
    formData.append('downpayment', this.formValid.get('downpayment').value);
    formData.append('imageFile', this.formValid.get('imageFile').value);

    this.inventoryService.updateVehicle(formData).subscribe(
      data=>{
        this.toasterService.Success("Spare Part Details Updated");
      },
      error =>{
        this.toasterService.Error("Spare Part Update Failed");
      } 
    )
  }

  clear(){
    this.formValid.reset();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formValid.get('imageFile').setValue(file);
    }
  }
}
