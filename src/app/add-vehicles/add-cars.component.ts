import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent implements OnInit {

  public formValid : FormGroup;
  public isValid = false;
  model : FormData;



  constructor(
    private inventoryService:InventoryService,
    private toasterService:ToasterService
    ) { }

  ngOnInit() {
    
    this.formValid = new FormGroup({
      item_type: new FormControl('car',Validators.required),
      stock:new FormControl('1',Validators.required),
      plate_no:new FormControl('',Validators.required),
      brand:new FormControl('',Validators.required),
      model:new FormControl('',Validators.required),
      prod_yr:new FormControl('',Validators.required),
      color:new FormControl('',Validators.required),
      mileage:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      down_payment:new FormControl('',Validators.required),
      imageFile:new FormControl('',Validators.required)
    });
  }

  ngOnDestroy() { }

  addVehicles(){
    console.log(this.formValid.value)
    const formData = new FormData();
    formData.append('imageFile', this.formValid.get('imageFile').value);
    formData.append('item_type', this.formValid.get('item_type').value);
    formData.append('stock', this.formValid.get('stock').value);
    formData.append('plate_no', this.formValid.get('plate_no').value);
    formData.append('brand', this.formValid.get('brand').value);
    formData.append('model', this.formValid.get('model').value);
    formData.append('prod_yr', this.formValid.get('prod_yr').value);
    formData.append('color', this.formValid.get('color').value);
    formData.append('mileage', this.formValid.get('mileage').value);
    formData.append('description', this.formValid.get('description').value);
    formData.append('price', this.formValid.get('price').value);
    formData.append('down_payment', this.formValid.get('down_payment').value);
    this.inventoryService.saveVehicles(formData).subscribe(
      data =>{
        this.toasterService.Success("Car Stock Updated")
      },
      error =>{
        this.toasterService.Error("Car Stock Update Failed")
      }
    )
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formValid.get('imageFile').setValue(file);
    }
  }

  clearForm(){
    this.formValid.reset();
  }


}
