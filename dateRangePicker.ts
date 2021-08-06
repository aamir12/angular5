import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { Ng4LoadingSpinnerService } from "ngx-loading-spinner";
import { Router } from "@angular/router";
import { DocumentService } from "../../documents-list/document.service";
import { LanguageService } from "../../../rlms-ui-framework/infrastructure/i18n/language.service";
import { LoanService } from "../../loan.service";
import { ApiproviderService } from "../../../rlms-ui-framework/infrastructure/api/apiprovider.service";
import { fadeInAnimation } from "../../../rlms-ui-framework/layout/animations/fadeAnimation";
import Swal from "sweetalert2";
import * as moment from "moment";
import * as XLSX from "xlsx";
import { ComponentStringComponent } from "../../../component-string/component-string.component";

type AOA = any[][];
declare var jsPDF: any;

@Component({
  selector: "app-payment-history",
  templateUrl: "./payment-history.component.html",
  styleUrls: ["./payment-history.component.css"],
  animations: [fadeInAnimation],
  host: { "[@fadeInAnimation]": "" },
})
export class PaymentHistoryComponent implements OnInit {
  //payment details object
  totaltransactionDetail = [];
  transactionDetail = [];
  p: number = 1;
  nativeAppFlag: boolean = false;
  dataload: boolean;
  loading: boolean;
  failureError = false;
  failureErrorMessage = ComponentStringComponent.tryAgain;
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
  dateStart: any;
  dateEnd: any;
  fullname: string = "";
  propertyaddress: string = "";
  pdfImage: any;
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
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
  //to check if we have the data and display the required field

  constructor(
    private translate: TranslateService,
    private langService: LanguageService,
    private loanService: LoanService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private router: Router,
    private documentService: DocumentService,
    private apiproviderService: ApiproviderService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.show();
    this.getPropertyaddress();
    this.getPdfImageUrl();
    this.langService.selectedLang.subscribe((langId) => {
      if (langId == 2) {
        this.translate.use("es");
      } else {
        this.translate.use("en");
      }
    });
    let nativeAppResponse = this.apiproviderService.nativeApp();
    if (nativeAppResponse.nativeApp) {
      this.nativeAppFlag = true;
    } else {
      this.nativeAppFlag = false;
    }
    let obj = {
      loanNumber: this.loanService.getLoan().loanNumber,
    };
    this.failureError = false;
    this.loading = true;
    this.dataload = false;
    this.apiproviderService.getPaymentTransactions(obj).subscribe((data) => {
      this.spinnerService.hide();

      switch (data.statusCode) {
        case "1":
          this.totaltransactionDetail = data.data.paymentTransactionList;
          this.transactionDetail = data.data.paymentTransactionList;
          this.defaultData();
          this.dataload = true;
          this.loading = false;
          this.failureError = false;
          break;
        case "101":
          this.apiproviderService.apiLogoutHandle();
          break;
        case "416":
          this.failureError = true;
          this.failureErrorMessage =
            ComponentStringComponent.unableProcessErrorMsg;
          this.loading = false;
          this.dataload = false;
          break;
        default:
          this.dataload = false;
          this.loading = false;
          this.failureError = true;
          this.failureErrorMessage = data.message;
          break;
      }
    });
  }

  toggleCSS(target) {
    if (target.className.includes("down")) {
      target.className = "fa fa-caret-up";
    } else {
      target.className = "fa fa-caret-down";
    }
  }

  checkAvailableData(data) {
    if (!data || data == "") return false;
    else return true;
  }

  redirectToDocument() {
    this.documentService.goToBillingStatement = true;
    this.navigateTo(["postlogin", "postloan", "documents"]);
  }

  navigateTo(args) {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.router.navigate(args);
    } else {
      if (args.includes("home")) {
        this.router.navigate(args);
      } else {
        this.router.navigate([
          "",
          { outlets: { modal: ["modal"].concat(args) } },
        ]);
      }
    }
  }

  downloadPDF() {
    // For further reference
    // https://github.com/simonbengtsson/jsPDF-AutoTable
    try {
      let fileName: string = "payment-history.pdf";
      let pdfdata = [];
      this.transactionDetail.forEach((element) => {
        let temp = [];
        temp.push(
          this.datePipe.transform(element.paymentAppliedDate, "MMM dd, y") ==
            null
            ? ""
            : this.datePipe.transform(element.paymentAppliedDate, "MMM dd, y")
        );
        temp.push(
          this.datePipe.transform(element.effectivDate, "MMM dd, y") == null
            ? ""
            : this.datePipe.transform(element.effectivDate, "MMM dd, y")
        );
        temp.push(
          this.datePipe.transform(element.paymentDueDate, "MMM dd, y") == null
            ? ""
            : this.datePipe.transform(element.paymentDueDate, "MMM dd, y")
        );
        temp.push(element.description == null ? "" : element.description);
        temp.push(
          this.currencyPipe.transform(element.amountPaid) == null
            ? ""
            : this.currencyPipe.transform(element.amountPaid)
        );
        temp.push(
          this.currencyPipe.transform(element.principal) == null
            ? ""
            : this.currencyPipe.transform(element.principal)
        );
        temp.push(
          this.currencyPipe.transform(element.interest) == null
            ? ""
            : this.currencyPipe.transform(element.interest)
        );
        temp.push(
          this.currencyPipe.transform(element.escrow) == null
            ? ""
            : this.currencyPipe.transform(element.escrow)
        );
        temp.push(
          this.currencyPipe.transform(element.suspenseAmount) == null
            ? ""
            : this.currencyPipe.transform(element.suspenseAmount)
        );
        temp.push(
          this.currencyPipe.transform(element.lateFee) == null
            ? ""
            : this.currencyPipe.transform(element.lateFee)
        );
        temp.push(
          this.currencyPipe.transform(element.otherFee) == null
            ? ""
            : this.currencyPipe.transform(element.otherFee)
        );
        // temp.push(this.currencyPipe.transform(element.principalBalance) == null ? '' : this.currencyPipe.transform(element.principalBalance));
        pdfdata.push(temp);
      });
      var tblColms = [
        { header: "Transaction Date" },
        { header: "Effective Date" },
        { header: "Payment Due" },
        { header: "Description Details" },
        { header: "Amount Paid" },
        { header: "Principal Amount" },
        { header: "Interest Amount" },
        { header: "Escrow Amount" },
        { header: "Suspense Amount" },
        { header: "Late Fees" },
        { header: "Other Fees" },
      ];
      var tblRows = pdfdata;
      var headerStyles = {
        headStyles: {
          cellWidth: 70,
          // fillColor: [255, 0, 0]
        },
        startY: 197,
      };
      var columnSty = {
        columnStyles: {
          0: { halign: "left" },
          1: { halign: "left" },
          2: { halign: "right" },
          3: { columnWidth: 100, overflow: "linebreak", halign: "left" },
          4: { halign: "right" },
          5: { halign: "right" },
          6: { halign: "right" },
          7: { halign: "right" },
          8: { halign: "right" },
          9: { halign: "right" },
          10: { halign: "right" },
        },
      };
      var doc = new jsPDF("l", "pt", "a4");
      let loanNumberText = this.loanService.getLoan().loanNumber;
      let todayDate = this.convertDate();
      let startDate;
      let endDate;
      //  let propertyaddress1 = this.capitalizeWord(this.propertyaddress.split('|')[0])
      // let propertyaddress2= (this.capitalizeWord(this.propertyaddress.split('|')[1])).trim();
      let propertyaddress1 = this.propertyaddress.split("|")[0].toUpperCase();
      let propertyaddress2 = this.propertyaddress
        .split("|")[1]
        .toUpperCase()
        .trim();
      let propertyaddress3 = this.propertyaddress.split("|")[2].trim();
      //  let propertyaddress4= (this.capitalizeWord(this.propertyaddress.split('|')[3])).trim();
      let propertyaddress4 = this.propertyaddress
        .split("|")[3]
        .toUpperCase()
        .trim();
      let fullname = this.capitalizeWord(this.fullname);
      doc.addImage(this.pdfImage, "JPG", 37, 30, 0, 0);
      doc.setFontType("normal");
      doc.setFontSize(13);
      doc.setTextColor(79, 79, 80);
      doc.text(620, 50, "Statement Date :");
      doc.text(725, 50, todayDate);
      doc.text(620, 70, "Loan Number :");
      doc.text(725, 70, loanNumberText);
      doc.setFontSize(13);
      doc.text(620, 90, fullname);
      doc.text(620, 110, propertyaddress1);
      doc.text(
        620,
        130,
        propertyaddress2 + ", " + propertyaddress3 + " " + propertyaddress4
      );

      doc.setFontType("bold");
      doc.setFillColor(228, 228, 228);
      doc.rect(40, 160, 780, 28, "F");

      doc.setTextColor(18, 42, 75);
      doc.text(60, 180, "Payment History - ");
      doc.setFontType("normal");
      if (
        this.daterange.start == "" ||
        this.daterange.start == null ||
        this.daterange.end == "" ||
        this.daterange.end == null
      ) {
        var newStartdate = new Date();
        this.dateEnd =
          newStartdate.getFullYear() +
          "-" +
          (newStartdate.getMonth() + 1 < 10
            ? "0" + (newStartdate.getMonth() + 1)
            : newStartdate.getMonth() + 1) +
          "-" +
          (newStartdate.getDate() < 10
            ? "0" + newStartdate.getDate()
            : newStartdate.getDate());
        newStartdate.setMonth(newStartdate.getMonth() - 13);
        this.dateStart =
          newStartdate.getFullYear() +
          "-" +
          (newStartdate.getMonth() + 1 < 10
            ? "0" + (newStartdate.getMonth() + 1)
            : newStartdate.getMonth() + 1) +
          "-" +
          (newStartdate.getDate() < 10
            ? "0" + newStartdate.getDate()
            : newStartdate.getDate());
        startDate = this.datePipe.transform(this.dateStart, "MMM dd, y");
        endDate = this.datePipe.transform(this.dateEnd, "MMM dd, y");
        doc.text(177, 180, startDate + " to " + endDate);
      } else {
        startDate = this.datePipe.transform(this.daterange.start, "MMM dd, y");
        endDate = this.datePipe.transform(this.daterange.end, "MMM dd, y");
        doc.text(177, 180, startDate + " to " + endDate);
      }

      doc.autoTable(tblColms, tblRows, headerStyles, columnSty);

      let nativeAppResponse = this.apiproviderService.nativeApp();
      if (nativeAppResponse.nativeApp) {
        let dateStart;
        let dateEnd;
        if (
          this.daterange.start == "" ||
          this.daterange.start == null ||
          this.daterange.end == "" ||
          this.daterange.end == null
        ) {
          // dateStart = 0;
          // dateEnd = 0;
          dateStart = this.dateStart;
          dateEnd = this.dateEnd;
        } else {
          dateStart =
            this.daterange.start.getFullYear() +
            "-" +
            (this.daterange.start.getMonth() + 1 < 10
              ? "0" + (this.daterange.start.getMonth() + 1)
              : this.daterange.start.getMonth() + 1) +
            "-" +
            (this.daterange.start.getDate() < 10
              ? "0" + this.daterange.start.getDate()
              : this.daterange.start.getDate());
          dateEnd =
            this.daterange.end.getFullYear() +
            "-" +
            (this.daterange.end.getMonth() + 1 < 10
              ? "0" + (this.daterange.end.getMonth() + 1)
              : this.daterange.end.getMonth() + 1) +
            "-" +
            (this.daterange.end.getDate() < 10
              ? "0" + this.daterange.end.getDate()
              : this.daterange.end.getDate());
        }
        location.href =
          "toolbar://callback?startDate=" +
          dateStart +
          "&endDate=" +
          dateEnd +
          "&loanNumber=" +
          this.loanService.getLoan().loanNumber;
      } else {
        doc.save(fileName);
      }
    } catch (error) {
      Swal("", ComponentStringComponent.unableToProcessReq, "error");
    }
  }

  downloadExcel() {
    try {
      let fileName: string = "payment-history.xlsx";
      let wopts: XLSX.WritingOptions = { bookType: "xlsx", type: "array" };
      let exceldata: AOA = [
        [
          "Transaction Date",
          "Payment Due",
          "Description",
          "Amount Paid",
          "Principal",
          "Interest",
          "Escrow",
          "Late Fees",
          "Other Fees",
        ],
      ];
      this.transactionDetail.forEach((element) => {
        let temp = [];
        temp.push(
          this.datePipe.transform(element.paymentAppliedDate, "MMM dd, y") ==
            null
            ? ""
            : this.datePipe.transform(element.paymentAppliedDate, "MMM dd, y")
        );
        temp.push(
          this.datePipe.transform(element.effectivDate, "MMM dd, y") == null
            ? ""
            : this.datePipe.transform(element.effectivDate, "MMM dd, y")
        );
        temp.push(
          this.datePipe.transform(element.paymentDueDate, "MMM dd, y") == null
            ? ""
            : this.datePipe.transform(element.paymentDueDate, "MMM dd, y")
        );
        temp.push(element.description == null ? "" : element.description);
        temp.push(
          this.currencyPipe.transform(element.amountPaid) == null
            ? ""
            : this.currencyPipe.transform(element.amountPaid)
        );
        temp.push(
          this.currencyPipe.transform(element.principal) == null
            ? ""
            : this.currencyPipe.transform(element.principal)
        );
        temp.push(
          this.currencyPipe.transform(element.interest) == null
            ? ""
            : this.currencyPipe.transform(element.interest)
        );
        temp.push(
          this.currencyPipe.transform(element.escrow) == null
            ? ""
            : this.currencyPipe.transform(element.escrow)
        );
        temp.push(
          this.currencyPipe.transform(element.suspenseAmount) == null
            ? ""
            : this.currencyPipe.transform(element.suspenseAmount)
        );
        temp.push(
          this.currencyPipe.transform(element.lateFee) == null
            ? ""
            : this.currencyPipe.transform(element.lateFee)
        );
        temp.push(
          this.currencyPipe.transform(element.otherFee) == null
            ? ""
            : this.currencyPipe.transform(element.otherFee)
        );
        // temp.push(this.currencyPipe.transform(element.principalBalance) == null ? '' : this.currencyPipe.transform(element.principalBalance));
        exceldata.push(temp);
      });
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(exceldata);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      /* save to file */
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      Swal("", ComponentStringComponent.unableToProcessReq, "error");
    }
  }

  //method on selection of date range
  public selectedDate(value: any, datepicker?: any) {
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;
    // or manupulat your own internal property
    this.daterange.start = new Date(value.start);
    this.daterange.end = new Date(value.end);
    this.daterange.label = value.label;
    this.transactionDetail = [];
    this.totaltransactionDetail.forEach((element) => {
      // let paidDate = new Date(element.paymentAppliedDate);
      // if (paidDate > this.daterange.start && paidDate < this.daterange.end) {
      //   this.transactionDetail.push(element);
      // }
      let paidDate;
      if (element.paymentAppliedDate.includes("-")) {
        paidDate = new Date(
          +element.paymentAppliedDate.split("-")[0],
          +element.paymentAppliedDate.split("-")[1] - 1,
          +element.paymentAppliedDate.split("-")[2]
        );
      } else {
        paidDate = new Date(element.paymentAppliedDate);
      }
      // let paidDate = new Date(element.paymentAppliedDate);
      if (paidDate >= this.daterange.start && paidDate < this.daterange.end) {
        this.transactionDetail.push(element);
      }
    });
  }
  /**
   * @method convertDate
   * @description Getting EST date with formate
   */
  convertDate() {
    let estDate;
    var clientDate = new Date();
    var estDateTime =
      clientDate.getTime() +
      (clientDate.getTimezoneOffset() * 60000 - clientDate.getTimezoneOffset());
    var offset = -5.0;
    estDate = new Date(estDateTime + 3600000 * offset);

    var date = estDate,
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");
  }

  /**
   * @method getPropertyaddress
   * @description To get property address of borrower/ co borrower
   */
  getPropertyaddress() {
    let obj = {
      loanNumber: this.loanService.getLoan().loanNumber,
    };
    this.apiproviderService.getpropertyaddress(obj).subscribe((data) => {
      switch (data.statusCode) {
        case "1":
          this.fullname = data.data.fullName;
          this.propertyaddress = data.data.propertyAddress;
          break;
        default:
          Swal("", data.message, "error");
          break;
      }
    });
  }

  /**
   * @method getPdfImageUrl
   * @description To get pdf image url
   */
  getPdfImageUrl() {
    this.apiproviderService.getImageUrl().subscribe((data) => {
      switch (data.statusCode) {
        case "1":
          this.pdfImage = data.data.imageUrl;
          break;
      }
    });
  }

  /**
   * @method defaultData
   * @description For displaying deafult 13 months data in the payment history screen
   */
  defaultData() {
    var dateRangeEnd = new Date();
    var dateRangeStart = new Date();
    dateRangeEnd.setHours(0, 0, 0, 0);
    dateRangeStart.setHours(0, 0, 0, 0);
    let enddateRange = dateRangeEnd;
    dateRangeStart.setMonth(dateRangeStart.getMonth() - 13);
    let startdateRange = dateRangeStart;
    this.transactionDetail = [];
    this.totaltransactionDetail.forEach((element) => {
      let paidDate;
      if (element.paymentAppliedDate.includes("-")) {
        paidDate = new Date(
          +element.paymentAppliedDate.split("-")[0],
          +element.paymentAppliedDate.split("-")[1] - 1,
          +element.paymentAppliedDate.split("-")[2]
        );
      } else {
        paidDate = new Date(element.paymentAppliedDate);
      }
      if (paidDate >= startdateRange && paidDate < enddateRange) {
        this.transactionDetail.push(element);
      }
    });
  }

  /**
   * @method capitalizeWord
   * @description For converting word to lower case and first letter to upper case.
   */
  capitalizeWord(word) {
    let capitalWord;
    return (capitalWord = word
      .toLowerCase()
      .replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      }));
  }
}
