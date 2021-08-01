import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TemplatingComponent } from "./templating/templating.component";

const routes: Routes = [
  {
    path: "customers",
    loadChildren: "app/customers/customers.module#CustomersModule",
  },
  {
    path: "employees",
    loadChildren: "app/crud-template/crud-template.module#CrudTemplateModule",
  },
  {
    path: "template",
    component: TemplatingComponent,
  },
  {
    path: "orders",
    loadChildren: "app/orders/orders.module#OrdersModule",
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
