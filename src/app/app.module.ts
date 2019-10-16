import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { FormBuilder } from '@angular/forms';
import { AddCarsComponent } from './add-vehicles/add-cars.component';
import { AddSparePartsComponent } from './add-spare-parts/add-spare-parts.component';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';
import { InventoryDetailedViewComponent } from './inventory-detailed-view/inventory-detailed-view.component';
import { InventoryService } from './services/inventory.service';
import { DataService } from './services/data.service';
import { SpareDetailedViewComponent } from './spare-detailed-view/spare-detailed-view.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ViewSparePartsComponent } from './view-spare-parts/view-spare-parts.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { ToasterService } from './services/toastr.service';
import { AddUsersComponent } from './add-users/add-users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { OrderDetailsReportComponent } from './order-details-report/order-details-report.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';

@NgModule({
  exports:[
    MatSliderModule,
  ]
  ,
  declarations: [
    AppComponent,
    AdminPanelComponent,
    HomeComponent,
    AddCarsComponent,
    AddSparePartsComponent,
    ViewInventoryComponent,
    InventoryDetailedViewComponent,
    SpareDetailedViewComponent,
    ViewVehiclesComponent,
    CartComponent,
    ContactUsComponent,
    ViewSparePartsComponent,
    LoginComponent,
    AddUsersComponent,
    UpdateUsersComponent,
    OrderDetailsReportComponent,
    InventoryReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,FormBuilder,InventoryService,DataService,ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
