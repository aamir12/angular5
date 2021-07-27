import { NgModule } from "@angular/core";

import { OrdersRoutingModule } from "./orders-routing.module";
import { OrderListComponent } from "./order-list/order-list.component";
import { SharedModule } from "../shared.module";

@NgModule({
  imports: [SharedModule, OrdersRoutingModule],
  declarations: [OrderListComponent],
})
export class OrdersModule {}
