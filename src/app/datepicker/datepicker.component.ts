import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IMyDpOptions } from "angular4-datepicker/src/my-date-picker";

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.css"],
})
export class DatepickerComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: "dd/mm/yyyy",
  };

  public model: any = { date: { year: 2018, month: 10, day: 9 } };
  @ViewChild("myForm") myForm: NgForm;
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.myForm.value);
  }
}
