import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddCustomerComponent } from "./add-customer/add-customer.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerListComponent,
  },
  {
    path: "add",
    component: AddCustomerComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
