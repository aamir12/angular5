import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { AddCustomerComponent } from "./add-customer/add-customer.component";
import { SharedModule } from "../shared.module";

@NgModule({
  imports: [SharedModule, CustomersRoutingModule],
  declarations: [CustomerListComponent, AddCustomerComponent],
})
export class CustomersModule {}
