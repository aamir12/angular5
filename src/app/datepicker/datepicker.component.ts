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

  public d1: any = { date: { year: 2018, month: 10, day: 9 } };
  public d2: any = { date: { year: 2018, month: 10, day: 9 } };
  @ViewChild("myForm") myForm: NgForm;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.myForm.value);
  }

  ////////start/////////
  claendarTemplate =
    '<div class="daterangepicker dropdown-menu">' +
    '<div class="calendar left">' +
    '<div class="daterangepicker_input hidden">' +
    '<input class="input-mini form-control" type="text" name="daterangepicker_start" value="" />' +
    '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
    '<div class="calendar-time">' +
    "<div></div>" +
    '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
    "</div>" +
    "</div>" +
    '<div class="calendar-table"></div>' +
    "</div>" +
    '<div class="calendar right">' +
    '<div class="daterangepicker_input hidden">' +
    '<input class="input-mini form-control" type="text" name="daterangepicker_end" value="" />' +
    '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
    '<div class="calendar-time">' +
    "<div></div>" +
    '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
    "</div>" +
    "</div>" +
    '<div class="calendar-table"></div>' +
    "</div>" +
    '<div class="ranges">' +
    '<div class="range_inputs">' +
    '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
    '<button class="cancelBtn" type="button"></button>' +
    "</div>" +
    "</div>" +
    "</div>";

  public daterange: any = {
    start: "",
    end: "",
  };

  public options: any = {
    locale: { format: "MM-DD-YYYY" },
    alwaysShowCalendars: false,
    showDropdowns: true,
    linkedCalendars: false,
    applyButtonClasses: "btn-primary",
    template: this.claendarTemplate,
    // Setting 5 years from current year
    minDate: moment().subtract(60, "month").startOf("month"),
    maxDate: moment().endOf("year"),
    ranges: {
      "Last 12 months": [
        moment().subtract(12, "month").startOf("month"),
        moment().subtract(0, "month").endOf("month"),
      ],
      "Last 24 months": [
        moment().subtract(24, "month").startOf("month"),
        moment().subtract(0, "month").endOf("month"),
      ],
      "Last 36 months": [
        moment().subtract(36, "month").startOf("month"),
        moment().subtract(0, "month").endOf("month"),
      ],
      "Last 5 years": [
        moment().subtract(60, "month").startOf("month"),
        moment().subtract(0, "month").endOf("month"),
      ],
    },
  };

  public selectedDate(value: any, datepicker?: any) {
    // any object can be passed to the selected event and it will be passed back here
    //datepicker.start = value.start;
    //datepicker.end = value.end;
    // or manupulat your own internal property
    this.daterange.start = new Date(value.start);
    this.daterange.end = new Date(value.end);
    this.daterange.label = value.label;
    console.log(this.daterange);
  }

  ////////end//////////
}
