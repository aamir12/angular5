import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrudComponent } from "./crud/crud.component";
import { CrudInputComponent } from "./crud-input/crud-input.component";
import { CrudListComponent } from "./crud-list/crud-list.component";

const routes: Routes = [
  {
    path: "",
    component: CrudComponent,
    children: [
      { path: "", component: CrudListComponent },
      { path: "create", component: CrudInputComponent },
      { path: ":id/edit", component: CrudInputComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudTemplateRoutingModule {}
