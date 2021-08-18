import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gitcommand",
  templateUrl: "./gitcommand.component.html",
  styleUrls: ["./gitcommand.component.css"],
})
export class GitcommandComponent implements OnInit {
  constructor(private http: HttpClient) {}
  pdfUrl: any;
  ngOnInit() {
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/pdf");

    this.http
      .get("http://localhost:3000/api/pdf/create", {
        headers: headers,
        responseType: "arraybuffer",
      })
      .subscribe((response) => {
        let file = new Blob([response], { type: "application/pdf" });
        const url = URL.createObjectURL(file);
        console.log(url);
        this.pdfUrl = url;
      });
  }
}
