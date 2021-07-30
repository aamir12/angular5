import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
  selector: "[appCompareValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CompareValidatorDirective,
      multi: true,
    },
  ],
})
export class CompareValidatorDirective implements Validator {
  validate(passwordGroup: AbstractControl): { [key: string]: any } | null {
    const passwordField = passwordGroup.get("password");
    const confirmPasswordField = passwordGroup.get("confirmPassword");
    if (
      passwordField &&
      confirmPasswordField &&
      passwordField.value !== confirmPasswordField.value
    ) {
      return { notEqual: true };
    }

    return null;
  }
}
