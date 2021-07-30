import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmEqualValidatorDirective } from "./form/directive/confirmPassword/confirm-password.directive";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [ConfirmEqualValidatorDirective],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ConfirmEqualValidatorDirective,
  ],
})
export class SharedModule {}
