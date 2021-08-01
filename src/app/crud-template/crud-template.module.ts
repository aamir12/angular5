import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CrudComponent } from "./crud/crud.component";
import { CrudInputComponent } from "./crud-input/crud-input.component";
import { CrudListComponent } from "./crud-list/crud-list.component";
import { FormsModule } from "@angular/forms";
import { CrudTemplateRoutingModule } from "./crud-template.module.routing";
import { SharedModule } from "../shared.module";

@NgModule({
  imports: [SharedModule, FormsModule, CrudTemplateRoutingModule],
  declarations: [CrudComponent, CrudInputComponent, CrudListComponent],
})
export class CrudTemplateModule {}
