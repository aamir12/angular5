import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared.module";
import { TemplatingComponent } from "./templating/templating.component";
import { CrudService } from "./crud-template/crud.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, TemplatingComponent],
  imports: [BrowserModule, SharedModule, HttpClientModule, AppRoutingModule],
  providers: [CrudService],
  bootstrap: [AppComponent],
})
export class AppModule {}
