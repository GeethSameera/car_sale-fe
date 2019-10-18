import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from '../services/toastr.service';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-add-spare-parts',
  templateUrl: './add-spare-parts.component.html',
  styleUrls: ['./add-spare-parts.component.sass']
})
export class AddSparePartsComponent implements OnInit {

  public formValid : FormGroup;
  public isValid = false;
  model : FormData;

  constructor(private inventoryService:InventoryService,
    private toasterService:ToasterService) { }

  ngOnInit() {
    this.formValid = new FormGroup({
      item_type: new FormControl('part',Validators.required),
      stock:new FormControl('',Validators.required),
      part_name:new FormControl('',Validators.required),
      brand:new FormControl('',Validators.required),
      model:new FormControl('',Validators.required),
      color:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      imageFile:new FormControl('',Validators.required)
    });
  }

  addSpareParts(){
    console.log(this.formValid.value)
    const formData = new FormData();
    formData.append('imageFile', this.formValid.get('imageFile').value);
    formData.append('item_type', this.formValid.get('item_type').value);
    formData.append('part_name', this.formValid.get('part_name').value);
    formData.append('stock', this.formValid.get('stock').value);
    formData.append('brand', this.formValid.get('brand').value);
    formData.append('description', this.formValid.get('description').value);
    formData.append('price', this.formValid.get('price').value);
    this.inventoryService.saveVehicles(formData).subscribe(
      data =>{
        this.toasterService.Success("Spare Parts Stock Updated")
        this.clearForm();
      },
      error =>{
        this.toasterService.Error("Spare Parts Stock Update Failed")
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
