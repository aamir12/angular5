import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [],
  exports: [ FormsModule, ReactiveFormsModule, CommonModule],
})
export class SharedModule {}
