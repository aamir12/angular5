import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { AddCustomerComponent } from "./add-customer/add-customer.component";
import { SharedModule } from "../shared.module";
import { RegisterComponent } from './register/register.component';
import { Register2Component } from './register2/register2.component';

@NgModule({
  imports: [SharedModule, CustomersRoutingModule],
  declarations: [CustomerListComponent, AddCustomerComponent, RegisterComponent, Register2Component],
})
export class CustomersModule {}
