import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CrudService } from "../crud.service";

@Component({
  selector: "app-crud-list",
  templateUrl: "./crud-list.component.html",
  styleUrls: ["./crud-list.component.css"],
})
export class CrudListComponent implements OnInit {
  constructor(private cs: CrudService, private router: Router) {}
  employees: any[] = [];
  loader: boolean = true;
  error: string = null;
  async ngOnInit() {
    let data = await this.cs.allEmp();
    if (data.error) {
      this.error = data.error;
    } else {
      this.employees = data.employees;
    }
    this.loader = false;
  }

  async delete(id) {
    if (confirm("Are you sure")) {
      this.loader = true;
      let result = await this.cs.delete(id);
      if (result["error"]) {
      }
      this.employees = this.cs.allEmployees;
      this.loader = false;
    }
  }

  navigate(id) {
    this.cs.selectedEmpIndex = id;
    this.router.navigate(["/employees/edit"]);
  }
}
