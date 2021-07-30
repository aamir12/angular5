import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[appSelectValidator]',
  providers: [
    {
        provide: NG_VALIDATORS,
        useExisting: SelectRequiredValidatorDirective,
        multi: true
    }]
})
export class SelectRequiredValidatorDirective  implements Validators{
  validate(control: AbstractControl): { [key: string]: any } | null {
    //access other element
    //console.log((control.root as FormGroup).controls.firstName.value);
    return control.value === null ? { 'selectError': true } : null;
  }
}
