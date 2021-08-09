import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  IMyDateModel,
  IMyDpOptions,
  IMyInputFieldChanged,
} from "angular4-datepicker/src/my-date-picker";
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
    showTodayBtn: false,
  };

  // public d1: any = { date: { year: 2018, month: 10, day: 9 } };
  // public d2: any = { date: { year: 2018, month: 10, day: 9 } };
  public d1: any = null;
  public d2: any = null;
  invalidDateRange = false;
  @ViewChild("myForm") myForm: NgForm;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.myForm.value);
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    if (this.d1 !== null && this.d2 !== null) {
      const d1 = moment(this.d1.formatted, "DD/MM/YYYY").format("YYYY-MM-DD");
      const d2 = moment(this.d2.formatted, "DD/MM/YYYY").format("YYYY-MM-DD");
      const after = moment(d1).isAfter(d2);
      const before = moment(d2).isBefore(d1);
      this.invalidDateRange = after || before;
      console.log(this.d1.formatted);
      console.log(this.d2.formatted);
      console.log(this.invalidDateRange);
    }
  }

  ////////start date range picker/////////
  calenderTemplate =
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
    alwaysShowCalendars: true,
    showDropdowns: true,
    linkedCalendars: false,
    applyButtonClasses: "btn-primary",
    template: this.calenderTemplate,
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
    console.log(value.end);
    this.daterange.start = new Date(value.start);
    this.daterange.end = new Date(value.end);
    this.daterange.label = value.label;
    //console.log(this.daterange);
    const d1 = moment(this.daterange.start).format("YYYY-MM-DD");
    const d2 = moment(this.daterange.end).format("YYYY-MM-DD");
    const d3 = new Date(this.daterange.end).toISOString();
    const d4 = moment.utc(this.daterange.end).format();
    console.log(d1);
    console.log(d2);
    console.log(d3);
    console.log(d4);
  }

  ////////end//////////
}
