import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DatePipe } from "@angular/common";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared.module";
import { TemplatingComponent } from "./templating/templating.component";
import { CrudService } from "./crud-template/crud.service";
import { HttpClientModule } from "@angular/common/http";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { MyDatePickerModule } from "../../node_modules/angular4-datepicker/src/my-date-picker";
import { Daterangepicker } from "ng2-daterangepicker";

@NgModule({
  declarations: [AppComponent, TemplatingComponent, DatepickerComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    MyDatePickerModule,
    Daterangepicker,
    AppRoutingModule,
  ],
  providers: [CrudService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
