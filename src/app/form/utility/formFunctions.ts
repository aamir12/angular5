import { FormControl, FormGroup } from "@angular/forms";

export function markAllTouched(form: any,status) {
  for (const key in form.controls) {
    //Find instance type
    //console.log(form.controls[key].constructor);
    if (form.controls[key] instanceof FormGroup) {
      markAllTouched(form.controls[key] as FormGroup,status);
    } else if (form.controls[key] instanceof FormControl) {
      (form.controls[key] as any).touched = status;
    }
  }
}
