import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { pairwise } from "rxjs/operator/pairwise";
import { startWith } from "rxjs/operator/startWith";
import { markAllTouched } from "../../form/utility/formFunctions";

@Component({
  selector: "app-register2",
  templateUrl: "./register2.component.html",
  styleUrls: ["./register2.component.css"],
})
export class Register2Component implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("empForm") empForm: NgForm;
  formSub: any;
  emp = {
    name: null,
    password: null,
    confirmPassword: null,
  };

  ngAfterViewInit() {
    this.formSub = this.empForm.valueChanges.subscribe((values: any) => {
      if (values.name && !!values.name) {
        console.log(`Name change`);
        //console.log(this.empForm.control.value);
        console.log(values.name);
      }
    });
  }

  ngOnInit() {
    // this.formSub = this.empForm.valueChanges.subscribe((values: any) => {
    //   console.log(values);
    //   // console.log("Value Change");
    //   // if (values.name) {
    //   //   console.log(this.empForm.control.get("name"));
    //   //   console.log(values.name);
    //   // }
    // });
    // this.empForm.statusChanges.subscribe(() => {
    //   console.log("Is form dirty yet: " + this.form.dirty);
    // });
  }

  RegisterEmp() {
    markAllTouched(this.empForm, true);
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

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }
}
