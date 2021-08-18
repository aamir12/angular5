import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { GitcommandComponent } from "./gitcommand/gitcommand.component";
import { PdfComponent } from "./pdf/pdf.component";
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
  {
    path: "datepicker",
    component: DatepickerComponent,
  },
  {
    path: "pdf",
    component: PdfComponent,
  },
  {
    path: "git",
    component: GitcommandComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
