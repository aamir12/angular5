import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CurrencyPipe, DatePipe } from "@angular/common";

import { PdfViewerModule } from "ng2-pdf-viewer";
import { HttpClientModule } from "@angular/common/http";
import { Daterangepicker } from "ng2-daterangepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared.module";
import { CrudService } from "./crud-template/crud.service";
import { MyDatePickerModule } from "../../node_modules/angular4-datepicker/src/my-date-picker";

import { AppComponent } from "./app.component";
import { PdfComponent } from "./pdf/pdf.component";
import { TemplatingComponent } from "./templating/templating.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { GitcommandComponent } from "./gitcommand/gitcommand.component";
import { ModalPopupComponent } from './modal-popup/modal-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplatingComponent,
    DatepickerComponent,
    PdfComponent,
    GitcommandComponent,
    ModalPopupComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    MyDatePickerModule,
    Daterangepicker,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    AppRoutingModule,
  ],
  providers: [CrudService, DatePipe, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
