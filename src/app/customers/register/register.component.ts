import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { markAllTouched } from "../../form/utility/formFunctions";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  @ViewChild("empForm") empForm: NgForm;

  emp = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    address: {
      state: null,
      city: null,
    },
  };

  ngOnInit() {}

  RegisterEmp() {
    markAllTouched(this.empForm);
    if (this.empForm.valid) {
      console.log(this.emp);
    }
  }

  // markAllTouched(form: NgForm) {
  //   for (const key in form.controls) {
  //     if (
  //       form.controls.hasOwnProperty(key) &&
  //       form.controls[key].hasOwnProperty("touched")
  //     ) {
  //       (form.controls[key] as any).touched = true;
  //     }
  //   }
  // }
}
