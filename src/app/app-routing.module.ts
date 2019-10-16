import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { InventoryDetailedViewComponent } from './inventory-detailed-view/inventory-detailed-view.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ViewSparePartsComponent } from './view-spare-parts/view-spare-parts.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'vehicles', component: ViewVehiclesComponent },
  { path: 'spare-parts', component: ViewSparePartsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact-us', component: ContactUsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
