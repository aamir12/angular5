import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { SelectRequiredValidatorDirective } from "./select-validator.directive";
import { ConfirmEqualValidatorDirective } from "./form/directive/confirmPassword/confirm-password.directive";
import { CompareValidatorDirective } from "./form/directive/compare-validator/compare-validator.directive";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [ConfirmEqualValidatorDirective, CompareValidatorDirective,SelectRequiredValidatorDirective],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ConfirmEqualValidatorDirective,
    CompareValidatorDirective,
    SelectRequiredValidatorDirective
  ],
})
export class SharedModule {}
