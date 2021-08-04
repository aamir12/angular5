import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CrudService } from "../crud.service";

@Component({
  selector: "app-crud-input",
  templateUrl: "./crud-input.component.html",
  styleUrls: ["./crud-input.component.css"],
})
export class CrudInputComponent implements OnInit {
  constructor(public cs: CrudService, private router: Router) {}

  @ViewChild("empForm") empForm: NgForm;

  emp = {
    fname: "",
    lname: "",
    email: "",
    mobile: "",
  };

  cloneEmp = {};
  selectedEmpIndex = -1;
  submitClick = false;
  loader = false;
  ngOnInit() {
    this.selectedEmpIndex = this.cs.selectedEmpIndex;
    if (this.selectedEmpIndex == -1) {
      //add
    } else {
      //edit
      this.cs.getEmp(this.selectedEmpIndex).subscribe((res) => {
        console.log(res.data);
        this.emp["email"] = res.data["email"];
        this.emp["fname"] = res.data["fname"];
        this.emp["lname"] = res.data["lname"];
        this.emp["mobile"] = res.data["mobile"];
      });
    }
    this.cloneEmp = JSON.parse(JSON.stringify(this.emp));
  }

  onSubmit() {
    this.markAllTouched(this.empForm, true);
    console.log(this.empForm.value);
    // return;
    console.log(this.empForm.valid);

    if (this.empForm.valid) {
      this.submitClick = true;
      const data = this.empForm.value;
      console.log(this.empForm.value);
      //return false;
      let obs: Observable<any> = null;
      if (this.selectedEmpIndex != -1) {
        //edit
        data["action"] = "editEmployee";
        data["id"] = this.selectedEmpIndex;
        obs = this.cs.edit(data);
      } else {
        //add
        data["action"] = "addEmployee";
        obs = this.cs.add(data);
      }
      obs.subscribe(
        (res) => {
          console.log("Success");
          console.log(res);
          this.router.navigate(["/employees"]);
          this.submitClick = false;
        },
        (error) => {
          console.log("Error");
          console.log(error);
          this.router.navigate(["/employees"]);
          this.submitClick = false;
        }
      );
    }
  }

  markAllTouched(form: any, status: boolean) {
    console.log(form.controls);
    for (const key in form.controls) {
      if (
        form.controls.hasOwnProperty(key) &&
        form.controls[key].hasOwnProperty("touched")
      ) {
        (form.controls[key] as any).touched = status;
      }
    }
  }

  disableButton() {
    console.log(this.emp);
    console.log(this.cloneEmp);
    return JSON.stringify(this.emp) == JSON.stringify(this.cloneEmp);
  }

  resetForm() {
    this.emp = JSON.parse(JSON.stringify(this.cloneEmp));
    this.markAllTouched(this.empForm, false);
  }
}
