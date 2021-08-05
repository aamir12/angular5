import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IMyDpOptions } from "angular4-datepicker/src/my-date-picker";
import * as moment from "moment";
import { DaterangepickerConfig } from "ng2-daterangepicker";

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
  public daterange: any = {};

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: "YYYY-MM-DD" },
    alwaysShowCalendars: true,
    ranges: {
      // "Last 15 minutes": [moment().subtract(15, "minute"), moment()],
      // "Last 30 minutes": [moment().subtract(30, "minute"), moment()],
      // "Last 1 hour": [moment().subtract(1, "hour"), moment()],
      // Yesterday: [moment().subtract(1, "day"), moment()],
      "Last week": [moment().subtract(1, "week"), moment()],
      "Last Month": [moment().subtract(1, "month"), moment()],
      "Last 3 Months": [moment().subtract(4, "month"), moment()],
      "Last 6 Months": [moment().subtract(6, "month"), moment()],
      "Last 12 Months": [moment().subtract(12, "month"), moment()],
    },
  };

  public selectedDate(value: any, datepicker?: any) {
    // this is the date  selected
    //console.log(value);
    // any object can be passed to the selected event and it will be passed back here
    // datepicker.start = value.start;
    // datepicker.end = value.end;
    // // use passed valuable to update state
    // this.daterange.start = value.start;
    // this.daterange.end = value.end;
    // this.daterange.label = value.label;
  }

  calendarApplay(value: any, datepicker?: any) {
    console.log(value.picker.startDate);
    console.log(value.picker.endDate);
    // datepicker.start = value.start;
    // datepicker.end = value.end;

    // // use passed valuable to update state
    this.daterange.start = value.picker.startDate;
    this.daterange.end = value.picker.endDate;
    // this.daterange.label = value.label;
  }
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.myForm.value);
  }
}
