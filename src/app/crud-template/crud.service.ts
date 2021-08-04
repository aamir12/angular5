import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable()
export class CrudService {
  url: string = environment.url;
  url1: string = environment.url1;
  public empData = new Subject<any>();
  constructor(private http: HttpClient) {}
  allEmployees: any[];
  selectedEmpIndex = -1;

  deleteFromEmp(id) {
    const index = this.allEmployees.findIndex((x) => x.eid === id);
    if (index !== -1) {
      this.allEmployees.splice(index, 1);
    }
  }
  add(data) {
    return this.http.post<any>(`${this.url}`, data);
  }
  edit(data) {
    return this.http.post<any>(`${this.url}`, data);
  }
  all() {
    return this.http.post<any>(`${this.url}`, { action: "allEmployee" });
  }

  async allEmp() {
    let result = {
      error: null,
      employees: [],
    };
    let isError = null;
    let res = await this.http
      .post<any>(`${this.url}`, { action: "allEmployee" })
      .toPromise()
      .catch((error) => {
        isError = error;
        result["error"] = "Server Error";
      });

    if (!isError && res) {
      this.allEmployees = res.data;
      result["employees"] = res.data;
    }
    console.log(result);
    return result;
  }

  async delete(id) {
    let result = {
      data: null,
      error: null,
    };
    result["data"] = await this.http
      .post<any>(`${this.url}`, {
        action: "deleteEmployee",
        id: id,
      })
      .toPromise()
      .catch((error) => {
        result["error"] = "Server Error";
      });

    if (result["data"]) {
      this.deleteFromEmp(id);
    }
    return result;
  }

  getEmp(id) {
    return this.http
      .post<any>(`${this.url}`, {
        action: "getEmployee",
        id: id,
      })
      .pipe(
        tap((x) => {
          console.log("side effect");
          console.log(x);
        })
      );
  }
}
