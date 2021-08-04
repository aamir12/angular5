import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CrudService } from "../crud.service";
import { markAllTouched } from "../../form/utility/formFunctions";

@Component({
  selector: "app-crud-input",
  templateUrl: "./crud-input.component.html",
  styleUrls: ["./crud-input.component.css"],
})
export class CrudInputComponent implements OnInit {
  constructor(public cs: CrudService, private router: Router) {}

  @ViewChild("empForm") empForm: NgForm;

  emp = {
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    image: null,
  };

  cloneEmp = {};
  defaultImgPath = "assets/img/user.png";
  imgPath = "assets/img/user.png";
  selectedEmpIndex = -1;
  submitClick = false;
  loader = false;

  ngOnInit() {
    this.selectedEmpIndex = this.cs.selectedEmpIndex;
    if (this.selectedEmpIndex == -1) {
      //add
    } else {
      //edit
      this.loader = true;
      this.cs.getEmp(this.selectedEmpIndex).subscribe((res) => {
        this.emp["email"] = res.data["email"];
        this.emp["fname"] = res.data["fname"];
        this.emp["lname"] = res.data["lname"];
        this.emp["mobile"] = res.data["mobile"];
        this.emp["image"] =
          "https://www.pngitem.com/pimgs/m/185-1850038_download-sample-png-file-download-sample-jpg-file.png";
        this.imgPath = this.emp["image"];
        this.loader = false;
      });
    }
    this.cloneEmp = JSON.parse(JSON.stringify(this.emp));
  }

  onSubmit() {
    this.submitClick = true;
    markAllTouched(this.empForm, true);
    // console.log(this.emp);
    //let check = true;
    let check = false;
    if (check) {
      return;
    }

    if (!this.empForm.valid) {
      return;
    }

    const data = this.emp;
    delete data.image;
    let obs: Observable<any> = null;
    if (this.selectedEmpIndex != -1) {
      //edit
      data["action"] = "editEmployee";
      data["id"] = this.selectedEmpIndex;
      obs = this.cs.edit(data);
    } else {
      //add
      data["action"] = "addEmployee";
      obs = this.cs.add(data);
    }

    this.loader = true;
    obs.subscribe(
      (res) => {
        console.log("Success");
        console.log(res);
        this.router.navigate(["/employees"]);
        this.loader = false;
      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.router.navigate(["/employees"]);
        this.loader = false;
      }
    );
  }

  disableButton() {
    console.log(this.emp);
    console.log(this.cloneEmp);
    return JSON.stringify(this.emp) == JSON.stringify(this.cloneEmp);
  }

  resetForm() {
    this.emp = JSON.parse(JSON.stringify(this.cloneEmp));
    markAllTouched(this.empForm, false);
  }

  onSelectedFile(event: any) {
    if (event.target.files.length === 0) {
      this.imgPath = this.defaultImgPath;
      this.emp.image = null;
      (this.empForm.controls["image"] as any).touched = true;
      console.log("No File select");
      return;
    }
    const file = event.target.files[0];
    if (file.type.match(/image\/*/) == null) {
      this.imgPath = this.defaultImgPath;
      this.emp.image = null;
      (this.empForm.controls["image"] as any).touched = true;
      console.log("NON image file");
      return;
    }

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgPath = event.target.result;
      this.emp.image = this.imgPath;
      console.log("Valid Image");
    };
    reader.readAsDataURL(file);
  }
}
