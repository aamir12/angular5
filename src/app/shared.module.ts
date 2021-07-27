import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  EmailValidator,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [EmailValidator],
  exports: [EmailValidator, FormsModule, ReactiveFormsModule, CommonModule],
})
export class SharedModule {}
