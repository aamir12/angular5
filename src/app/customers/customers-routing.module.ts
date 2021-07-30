import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddCustomerComponent } from "./add-customer/add-customer.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { RegisterComponent } from "./register/register.component";
import { Register2Component } from "./register2/register2.component";

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
  {
    path: "register2",
    component: Register2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
