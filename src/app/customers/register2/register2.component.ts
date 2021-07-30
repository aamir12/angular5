import { Component, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { markAllTouched } from "../../form/utility/formFunctions";

@Component({
  selector: "app-register2",
  templateUrl: "./register2.component.html",
  styleUrls: ["./register2.component.css"],
})
export class Register2Component {
  @ViewChild("empForm") empForm: NgForm;
  emp = {
    name: null,
    password: null,
    confirmPassword: null,
  };

  RegisterEmp() {
    markAllTouched(this.empForm);
    if (this.empForm.valid) {
      console.log(this.emp);
    }
  }

  //only work when pass data from parent to child
  // ngOnChanges(changes: SimpleChanges) {
  //   const previousEmployee = changes.emp.previousValue;
  //   const currentEmployee = changes.emp.currentValue;

  //   console.log(
  //     "Previous : " + (previousEmployee ? previousEmployee.name : "NULL")
  //   );
  //   console.log("Current : " + currentEmployee.name);
  // }
}
