import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.css"],
})
export class AddCustomerComponent implements OnInit {
  constructor() {}

  @ViewChild("empForm") empForm: NgForm;
  emp = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    countries: [1, 2, 5],
  };
  countries = [
    { id: 1, name: "Italia", checked: false },
    { id: 2, name: "Brasile", checked: false },
    { id: 3, name: "Florida", checked: false },
    { id: 4, name: "Spagna", checked: false },
    { id: 5, name: "Santo Domingo", checked: false },
  ];
  ngOnInit() {
    //IN case of EDIT
    // this.countries = this.countries.map((x) => {
    //   if (this.emp.countries.indexOf(x.id) !== -1) {
    //     x.checked = true;
    //   }
    //   return x;
    // });
  }

  onchangeCountry(e: any) {
    if (e.target.checked) {
      this.emp.countries.push(e.target.value);
    } else {
      const index = this.emp.countries.findIndex((x) => x === e.target.value);
      if (index !== -1) {
        this.emp.countries.splice(index, 1);
      }
    }
  }

  RegisterEmp() {
    console.log(this.emp.countries);
  }
}
