import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CurrencyPipe, DatePipe } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared.module";
import { CrudService } from "./crud-template/crud.service";
import { HttpClientModule } from "@angular/common/http";
import { MyDatePickerModule } from "../../node_modules/angular4-datepicker/src/my-date-picker";

import { AppComponent } from "./app.component";
import { Daterangepicker } from "ng2-daterangepicker";
import { PdfComponent } from "./pdf/pdf.component";
import { TemplatingComponent } from "./templating/templating.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";

@NgModule({
  declarations: [
    AppComponent,
    TemplatingComponent,
    DatepickerComponent,
    PdfComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    MyDatePickerModule,
    Daterangepicker,
    AppRoutingModule,
  ],
  providers: [CrudService, DatePipe, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
