import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app";
  ngOnInit() {
    //S1 Working : The date is lie in proper ranage
    // const start = moment().subtract(1, "days");
    // const end = new Date();
    // const actual = moment().subtract(1, "hours"); //add
    // const test = moment(actual).isBetween(start, end);
    // console.log(test);
    //S2 UTC Format
    //var date = moment("2016-10-19");
    //console.log(date.isValid());
    //console.log(date);
    //console.log("UTC time:", moment.utc("2016-10-19").format());
    //S3 Compare Date Time
    // let d1 = "2021-05-01";
    // let d2 = "2021-05-10";
    // let after50days = moment().add(50, "days").format("YYYY-MM-DD");
    // console.log(after50days);
    // var isafter = moment(d2).isAfter(d1);
    // //var isafter = moment(d2).isAfter(d1);
    // console.log(isafter);
    //S4 Different Format
    // let d1 = "05/08/2021";
    // let d2 = "10/08/2021";
    // console.log(moment(d2).isAfter(d1));
  }
}
