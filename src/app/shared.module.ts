import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { SelectRequiredValidatorDirective } from "./select-validator.directive";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [SelectRequiredValidatorDirective],
  exports: [ FormsModule, ReactiveFormsModule, CommonModule,SelectRequiredValidatorDirective],
})
export class SharedModule {}
