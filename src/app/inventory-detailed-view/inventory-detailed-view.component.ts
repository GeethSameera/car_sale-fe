import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { InventoryService } from '../services/inventory.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-inventory-detailed-view',
  templateUrl: './inventory-detailed-view.component.html',
  styleUrls: ['./inventory-detailed-view.component.sass']
})
export class InventoryDetailedViewComponent implements OnInit {

  public formValid : FormGroup;
  public isValid = false;
  model : FormData;
  selectedCar;
  
  constructor(
    private dataService:DataService,
    private inventoryService : InventoryService,
    private toasterService:ToasterService
    ) { }

  ngOnInit() {
    this.formValid = new FormGroup({
      invid: new FormControl('',Validators.required),
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
    this.selectedCar = this.dataService.selectedCar;
    console.log(this.selectedCar)
    this.formValid.patchValue(this.selectedCar);
    this.formValid.get("invid").setValue(this.selectedCar.invid);
    this.formValid.get("itemtype").setValue(this.selectedCar.itemtype);
  }

  updateVehicle(){
    const formData = new FormData();
    formData.append('invid', this.formValid.get('invid').value);
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
        this.toasterService.Success("Vehicle Details Updated");
      },
      error =>{
        this.toasterService.Error("Vehicle Update Failed");
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
