import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as XLSX from "xlsx";
import { NgForm } from "@angular/forms";
//import * as jsPDF from "jspdf";
import "jspdf-autotable";

type AOA = any[][];
declare var jsPDF: any;

@Component({
  selector: "app-pdf",
  templateUrl: "./pdf.component.html",
  styleUrls: ["./pdf.component.css"],
})
export class PdfComponent implements OnInit {
  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {}

  payments: any[] = [
    {
      amountPaid: 1045.83,
      decription: "Payment",
      effectiveDate: "2021-07-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 1000.0,
      decription: "Payment",
      effectiveDate: "2021-06-21",
      escrow: 512.47,
      interest: 318.03,
    },
    {
      amountPaid: 1068.83,
      decription: "Payment",
      effectiveDate: "2021-05-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 900.0,
      decription: "Payment",
      effectiveDate: "2021-04-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 1045.83,
      decription: "Payment",
      effectiveDate: "2021-03-21",
      escrow: 509.47,
      interest: 500,
    },
    {
      amountPaid: 300,
      decription: "Payment",
      effectiveDate: "2021-02-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officiis ",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officiis ",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
    {
      amountPaid: 450.55,
      decription: "Payment",
      effectiveDate: "2021-01-21",
      escrow: 509.47,
      interest: 318.03,
    },
  ];

  ngOnInit() {
    console.log(jsPDF);
  }

  propertyaddress =
    "H-82, Friends colony|New Ashoka Garden| Near Janta Quater|Mumbai, MH 462023";
  dateEnd: any;
  dateStart: any;
  downloadPdf() {
    try {
      let fileName: string = "payment-history.pdf";
      let pdfdata = [];
      this.payments.forEach((element) => {
        let temp = [];

        temp.push(
          this.datePipe.transform(element.effectiveDate, "MMM dd, y") == null
            ? ""
            : this.datePipe.transform(element.effectiveDate, "MMM dd, y")
        );
        temp.push(element.decription == null ? "" : element.decription);
        temp.push(
          this.currencyPipe.transform(element.amountPaid) == null
            ? ""
            : this.currencyPipe.transform(element.amountPaid)
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
        pdfdata.push(temp);
      });
      var tblColms = [
        { header: "Effective Date" },
        { header: "Description Details" },
        { header: "Amount Paid" },
        { header: "Interest Amount" },
        { header: "Escrow Amount" },
      ];
      var tblRows = pdfdata;
      console.log(tblRows);
      var headerStyles = {
        headStyles: {
          //cellWidth: 100,
          // fillColor: [255, 0, 0]
        },
        startY: 197,
      };
      var columnSty = {
        columnStyles: {
          1: { halign: "left" },
          2: { columnWidth: 30, overflow: "linebreak", halign: "left" },
          3: { halign: "right" },
          4: { halign: "right" },
          5: { halign: "right" },
        },
      };
      var doc = new jsPDF("l", "pt", "a4");
      let loanNumberText = "1475265000533";
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
      let fullname = this.capitalizeWord("Bank Transactions");
      doc.addImage(this.base64Img, "JPG", 37, 30, 0, 0);
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

      doc.autoTable(tblColms, tblRows, headerStyles, columnSty);
      doc.save(fileName);
      //only html export to pdf
      //doc.autoTable({ html: "#my-table" });
      //doc.save("table.pdf");
    } catch (error) {
      console.log(error);
    }
  }

  downloadExl() {
    try {
      let fileName: string = "payment-history.xlsx";
      let wopts: XLSX.WritingOptions = { bookType: "xlsx", type: "array" };

      let exceldata: AOA = [
        [
          "Transaction Date",
          "Description",
          "Amount Paid",
          "Escrow",
          "Interest",
        ],
      ];
      this.payments.forEach((element) => {
        let temp = [];

        temp.push(
          this.datePipe.transform(element.effectivDate, "MMM dd, y") == null
            ? ""
            : this.datePipe.transform(element.effectivDate, "MMM dd, y")
        );
        temp.push(element.decription == null ? "" : element.decription);
        temp.push(
          this.currencyPipe.transform(element.amountPaid) == null
            ? ""
            : this.currencyPipe.transform(element.amountPaid)
        );

        temp.push(
          this.currencyPipe.transform(element.escrow) == null
            ? ""
            : this.currencyPipe.transform(element.escrow)
        );
        temp.push(
          this.currencyPipe.transform(element.interest) == null
            ? ""
            : this.currencyPipe.transform(element.interest)
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
      console.log(error);
    }
  }

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

  capitalizeWord(word) {
    let capitalWord;
    return (capitalWord = word
      .toLowerCase()
      .replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      }));
  }

  @ViewChild("selectForm") selectForm: NgForm;
  lUsers: any[] = [
    { Name: "Billy Williams", id: "1" },
    { Name: "Sally Ride", id: "2" },
  ];
  auth = {
    user: null,
  };

  onSubmit() {
    console.log(this.selectForm.valid);
  }

  base64Img =
    "data:image/png;base64,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";
}
