import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CrudService } from "../crud.service";

@Component({
  selector: "app-crud-list",
  templateUrl: "./crud-list.component.html",
  styleUrls: ["./crud-list.component.css"],
})
export class CrudListComponent implements OnInit, OnDestroy {
  constructor(private cs: CrudService, private router: Router) {}
  employees: any[] = [];
  loader: boolean = true;
  empSub: Subscription;
  error: string = null;
  ngOnInit() {
    // this.cs.all().subscribe(
    //   (res) => {
    //     this.employees = res.data;
    //     this.loader = false;
    //   },
    //   (error) => {
    //     this.loader = false;
    //   }
    // );

    this.cs.allEmp();
    this.empSub = this.cs.empData.subscribe((res) => {
      console.log(res);
      this.loader = false;
      if (res.status) {
        this.employees = res.data;
        this.error = null;
      } else {
        this.error = res.error;
      }
    });
  }

  delete(id) {
    if (confirm("Are you sure")) {
      this.cs.delete(id).subscribe((res) => {
        this.loader = true;
        this.cs.allEmp();
      });
    }
  }

  ngOnDestroy() {
    this.empSub.unsubscribe();
  }

  fetchEmp(id) {
    this.cs.getEmp(id).subscribe((res) => {
      console.log("IN LIST");
      console.log(res);
    });
  }
}
