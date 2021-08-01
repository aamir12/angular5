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
  add(data) {
    return this.http.post<any>(`${this.url}`, data);
  }
  edit(data) {
    return this.http.post<any>(`${this.url}`, data);
  }
  all() {
    return this.http.post<any>(`${this.url}`, { action: "allEmployee" });
  }

  allEmp() {
    this.http.post<any>(`${this.url}`, { action: "allEmployee" }).subscribe(
      (res) => {
        this.empData.next({ status: true, data: res.data });
      },
      (error) => {
        console.log(error);
        this.empData.next({ status: false, error: error.message });
      }
    );
  }

  delete(id) {
    return this.http.post<any>(`${this.url}`, {
      action: "deleteEmployee",
      id: id,
    });
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
