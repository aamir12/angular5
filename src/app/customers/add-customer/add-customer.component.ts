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
    firstName: null,
    lastName: null,
    email: null,
    gender: null,
    countries: [1,2],
    state:null
  };

  countryError = false;
  countries = [
    { id: 1, name: "Italia", checked: false },
    { id: 2, name: "Brasile", checked: false },
    { id: 3, name: "Florida", checked: false },
    { id: 4, name: "Spagna", checked: false },
    { id: 5, name: "Santo Domingo", checked: false },
  ];
  
  states = [
    {id:1,name:'MP'},
    {id:2,name:'UP'},
    {id:3,name:'AP'},
    {id:4,name:'JK'}
  ];

  ngOnInit() {
    //IN case of EDIT
    this.countries = this.countries.map((x) => {
      if (this.emp.countries.indexOf(x.id) !== -1) {
        x.checked = true;
      }
      return x;
    });
  }

  onchangeCountry(e: any) {
    if (e.target.checked) {
      this.emp.countries.push(+e.target.value);
    } else {
      const index = this.emp.countries.findIndex((x) => x === +e.target.value);
      if (index !== -1) {
        this.emp.countries.splice(index, 1);
      }
    }
  }

  RegisterEmp() {
    this.markAllTouched(this.empForm);
    if(this.empForm.valid){
      console.log(this.emp);
    }
  }
  
  
  markAllTouched(form:NgForm){
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key) && form.controls[key].hasOwnProperty('touched')) {
         (form.controls[key] as any).touched  = true;
      }
    }
    this.countryError = false
    if(this.emp.countries.length==0){
      this.countryError = true;
    }
  }
}
